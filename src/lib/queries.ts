import { categories, courses, instructors, testimonials, students } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import type { Category, Course, Instructor, Testimonial, Student } from "@/db/schema";
import {
  demoCategories,
  demoCourses,
  demoInstructors,
  demoStudents,
  demoTestimonials,
} from "@/lib/demo-data";

export type CourseWithRels = Course & {
  category: Category | null;
  instructor: Instructor | null;
};

/** Demo mode is the default: set DATABASE_URL to switch to PostgreSQL. */
const USE_DB = Boolean(process.env.DATABASE_URL);

const byName = <T extends { name: string }>(a: T, b: T) => a.name.localeCompare(b.name);

function demoJoin(): CourseWithRels[] {
  const cats = new Map(demoCategories.map((c) => [c.id, c]));
  const inst = new Map(demoInstructors.map((i) => [i.id, i]));
  return demoCourses.map((c) => ({
    ...c,
    category: c.categoryId ? cats.get(c.categoryId) ?? null : null,
    instructor: c.instructorId ? inst.get(c.instructorId) ?? null : null,
  }));
}

async function database() {
  const { db } = await import("@/db");
  return db;
}

export async function getCategories(): Promise<Category[]> {
  if (!USE_DB) return [...demoCategories].sort(byName);
  const db = await database();
  return db.select().from(categories).orderBy(categories.name);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!USE_DB) return demoTestimonials;
  const db = await database();
  return db.select().from(testimonials);
}

export async function getInstructors(): Promise<Instructor[]> {
  if (!USE_DB) return [...demoInstructors].sort((a, b) => b.students - a.students);
  const db = await database();
  return db.select().from(instructors).orderBy(desc(instructors.students));
}

async function allCourses(): Promise<CourseWithRels[]> {
  if (!USE_DB) return demoJoin();
  const db = await database();
  const rows = await db
    .select({ course: courses, category: categories, instructor: instructors })
    .from(courses)
    .leftJoin(categories, eq(courses.categoryId, categories.id))
    .leftJoin(instructors, eq(courses.instructorId, instructors.id))
    .orderBy(desc(courses.featured), desc(courses.studentsCount));
  return rows.map((r) => ({ ...r.course, category: r.category, instructor: r.instructor }));
}

export async function getAllCourses(): Promise<CourseWithRels[]> {
  return allCourses();
}

export async function getFeaturedCourses(): Promise<CourseWithRels[]> {
  const all = await allCourses();
  return all.filter((c) => c.featured);
}

export async function getCourseBySlug(slug: string): Promise<CourseWithRels | null> {
  const all = await allCourses();
  return all.find((c) => c.slug === slug) ?? null;
}

export async function getRelatedCourses(
  categoryId: number | null,
  excludeSlug: string,
): Promise<CourseWithRels[]> {
  const all = await allCourses();
  return all
    .filter((c) => c.slug !== excludeSlug && (categoryId ? c.categoryId === categoryId : true))
    .slice(0, 3);
}

export async function getStudentByCode(studentCode: string): Promise<Student | null> {
  if (!USE_DB) {
    return demoStudents.find((s) => s.studentCode === studentCode) ?? null;
  }
  const db = await database();
  const rows = await db
    .select()
    .from(students)
    .where(eq(students.studentCode, studentCode))
    .limit(1);
  return rows[0] ?? null;
}
