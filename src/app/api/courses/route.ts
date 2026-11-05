import { getAllCourses } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const q = searchParams.get("q")?.toLowerCase();

  let courses = await getAllCourses();
  if (category) courses = courses.filter((c) => c.category?.slug === category);
  if (q) {
    courses = courses.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }

  return Response.json({
    ok: true,
    count: courses.length,
    data: courses.map((c) => ({
      id: c.id,
      slug: c.slug,
      title: c.title,
      subtitle: c.subtitle,
      category: c.category?.name ?? null,
      instructor: c.instructor?.name ?? null,
      level: c.level,
      price: c.price,
      offerPrice: c.offerPrice,
      rating: Number(c.rating),
      students: c.studentsCount,
      mode: c.mode,
      tags: c.tags,
    })),
  });
}
