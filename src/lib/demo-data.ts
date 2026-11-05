import type {
  Category,
  Course,
  Instructor,
  Student,
  Testimonial,
} from "@/db/schema";
import {
  categorySeed,
  courseSeed,
  instructorSeed,
  studentSeed,
  testimonialSeed,
} from "@/db/seed-data";

/**
 * In-memory mirror of the database seed, shaped exactly like the Drizzle
 * `.$inferSelect` types. Used whenever DATABASE_URL is not configured so every
 * page, API route and component behaves identically in demo mode.
 */
const EPOCH = new Date("2026-01-01T00:00:00.000Z");

export const demoCategories: Category[] = categorySeed.map((c, i) => ({
  id: i + 1,
  slug: c.slug,
  name: c.name,
  icon: c.icon,
  description: c.description,
  group: c.group,
  courseCount: courseSeed.filter((x) => x.categorySlug === c.slug).length,
}));

export const demoInstructors: Instructor[] = instructorSeed.map((i, idx) => ({
  id: idx + 1,
  slug: i.slug,
  name: i.name,
  title: i.title,
  bio: i.bio,
  avatar: i.avatar,
  rating: i.rating,
  students: i.students,
  expertise: i.expertise,
}));

const categoryIdBySlug = new Map(demoCategories.map((c) => [c.slug, c.id]));
const instructorIdBySlug = new Map(demoInstructors.map((i) => [i.slug, i.id]));

export const demoCourses: Course[] = courseSeed.map((c, idx) => ({
  id: idx + 1,
  slug: c.slug,
  title: c.title,
  subtitle: c.subtitle,
  description: c.description,
  categoryId: categoryIdBySlug.get(c.categorySlug) ?? null,
  instructorId: instructorIdBySlug.get(c.instructorSlug) ?? null,
  level: c.level,
  durationWeeks: c.durationWeeks,
  hours: c.hours,
  price: c.price,
  offerPrice: c.offerPrice,
  rating: c.rating,
  reviewsCount: c.reviewsCount,
  studentsCount: c.studentsCount,
  gradient: c.gradient,
  accent: c.accent,
  mode: "both",
  emoji: c.emoji,
  image: c.image,
  images: c.images,
  tags: c.tags,
  highlights: c.highlights,
  syllabus: c.syllabus,
  projects: c.projects,
  hasCertificate: true,
  hasPlacement: true,
  hasInternship: c.hasInternship,
  featured: c.featured,
  createdAt: EPOCH,
}));

export const demoTestimonials: Testimonial[] = testimonialSeed.map((t, i) => ({
  id: i + 1,
  name: t.name,
  role: t.role,
  company: t.company,
  avatar: t.avatar,
  rating: t.rating,
  quote: t.quote,
  package: t.package,
}));

export const demoStudents: Student[] = studentSeed.map((s, i) => ({
  id: i + 1,
  studentCode: s.studentCode,
  name: s.name,
  email: s.email,
  phone: s.phone,
  course: s.course,
  batch: s.batch,
  photo: s.photo,
  bloodGroup: s.bloodGroup,
  faceEnrolled: s.faceEnrolled,
  issuedOn: s.issuedOn,
  validThru: s.validThru,
  createdAt: EPOCH,
}));

export const DEMO_STUDENT_CODE = studentSeed[0].studentCode;
