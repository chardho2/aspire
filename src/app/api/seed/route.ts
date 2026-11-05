import { hasDatabase, db } from "@/db";
import {
  categories,
  instructors,
  courses,
  testimonials,
  enrollments,
  contacts,
  students,
  faceAuthLogs,
} from "@/db/schema";
import { sql } from "drizzle-orm";
import {
  categorySeed,
  instructorSeed,
  courseSeed,
  testimonialSeed,
  studentSeed,
} from "@/db/seed-data";

export const dynamic = "force-dynamic";

async function reset() {
  await db.delete(faceAuthLogs);
  await db.delete(enrollments);
  await db.delete(courses);
  await db.delete(testimonials);
  await db.delete(instructors);
  await db.delete(categories);
  await db.delete(contacts);
  await db.delete(students);
}

async function insertAll() {
  const insertedCats = await db
    .insert(categories)
    .values(
      categorySeed.map((c) => ({
        slug: c.slug,
        name: c.name,
        icon: c.icon,
        group: c.group,
        description: c.description,
      })),
    )
    .returning();
  const catBySlug = new Map(insertedCats.map((c) => [c.slug, c.id]));

  const insertedInstructors = await db
    .insert(instructors)
    .values(
      instructorSeed.map((i) => ({
        slug: i.slug,
        name: i.name,
        title: i.title,
        avatar: i.avatar,
        rating: i.rating,
        students: i.students,
        bio: i.bio,
        expertise: i.expertise,
      })),
    )
    .returning();
  const instBySlug = new Map(insertedInstructors.map((i) => [i.slug, i.id]));

  const countByCat = new Map<string, number>();
  for (const c of courseSeed) {
    countByCat.set(c.categorySlug, (countByCat.get(c.categorySlug) ?? 0) + 1);
  }

  await db.insert(courses).values(
    courseSeed.map((c) => ({
      slug: c.slug,
      title: c.title,
      subtitle: c.subtitle,
      description: c.description,
      categoryId: catBySlug.get(c.categorySlug) ?? null,
      instructorId: instBySlug.get(c.instructorSlug) ?? null,
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
      emoji: c.emoji,
      image: c.image,
      images: c.images,
      tags: c.tags,
      highlights: c.highlights,
      syllabus: c.syllabus,
      projects: c.projects,
      hasInternship: c.hasInternship,
      featured: c.featured,
    })),
  );

  for (const [slug, count] of countByCat.entries()) {
    await db
      .update(categories)
      .set({ courseCount: count })
      .where(sql`${categories.slug} = ${slug}`);
  }

  await db.insert(testimonials).values(testimonialSeed);

  await db.insert(students).values(
    studentSeed.map((s) => ({
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
    })),
  );
}

async function seed(force: boolean) {
  const existing = await db.select({ id: courses.id }).from(courses).limit(1);
  if (existing.length > 0 && !force) {
    return { seeded: false, message: "Database already seeded." };
  }

  if (existing.length > 0 && force) {
    await reset();
  }

  await insertAll();
  return { seeded: true, message: "Database seeded successfully." };
}

export async function GET(req: Request) {
  if (!hasDatabase) {
    return Response.json({
      ok: true,
      seeded: false,
      message: "Demo mode: the site is already populated with the bundled seed data. Set DATABASE_URL and call /api/seed to seed PostgreSQL.",
    });
  }
  try {
    const { searchParams } = new URL(req.url);
    const force = searchParams.get("force") === "true";
    const result = await seed(force);
    return Response.json({ ok: true, ...result });
  } catch (err) {
    console.error("Seed error", err);
    return Response.json(
      { ok: false, error: (err as Error).message },
      { status: 500 },
    );
  }
}
