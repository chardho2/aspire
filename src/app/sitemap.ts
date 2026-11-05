import type { MetadataRoute } from "next";
import { getAllCourses } from "@/lib/queries";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://chardho-aspire.example.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = [
    "",
    "/courses",
    "/categories",
    "/placements",
    "/about",
    "/contact",
    "/design",
    "/login",
    "/dashboard",
    "/profile",
    "/privacy-policy",
    "/terms-of-service",
    "/refund-policy",
  ];
  const now = new Date();

  const staticEntries = staticPaths.map((p) => ({
    url: `${BASE}${p}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.7,
  }));

  let courseEntries: MetadataRoute.Sitemap = [];
  try {
    const courses = await getAllCourses();
    courseEntries = courses.map((c) => ({
      url: `${BASE}/courses/${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch {
    courseEntries = [];
  }

  return [...staticEntries, ...courseEntries];
}
