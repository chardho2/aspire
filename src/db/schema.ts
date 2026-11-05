import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  boolean,
  timestamp,
  jsonb,
  numeric,
} from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  name: varchar("name", { length: 160 }).notNull(),
  icon: varchar("icon", { length: 16 }).notNull().default("📚"),
  description: text("description").notNull().default(""),
  group: varchar("group", { length: 120 }).notNull().default("General"),
  courseCount: integer("course_count").notNull().default(0),
});

export const instructors = pgTable("instructors", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  name: varchar("name", { length: 160 }).notNull(),
  title: varchar("title", { length: 200 }).notNull().default(""),
  bio: text("bio").notNull().default(""),
  avatar: varchar("avatar", { length: 16 }).notNull().default("🧑‍🏫"),
  rating: numeric("rating", { precision: 3, scale: 2 }).notNull().default("4.80"),
  students: integer("students").notNull().default(0),
  expertise: jsonb("expertise").$type<string[]>().notNull().default([]),
});

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 160 }).notNull().unique(),
  title: varchar("title", { length: 220 }).notNull(),
  subtitle: varchar("subtitle", { length: 320 }).notNull().default(""),
  description: text("description").notNull().default(""),
  categoryId: integer("category_id").references(() => categories.id),
  instructorId: integer("instructor_id").references(() => instructors.id),
  level: varchar("level", { length: 40 }).notNull().default("Beginner"),
  durationWeeks: integer("duration_weeks").notNull().default(8),
  hours: integer("hours").notNull().default(40),
  price: integer("price").notNull().default(0),
  offerPrice: integer("offer_price").notNull().default(0),
  rating: numeric("rating", { precision: 3, scale: 2 }).notNull().default("4.70"),
  reviewsCount: integer("reviews_count").notNull().default(0),
  studentsCount: integer("students_count").notNull().default(0),
  gradient: varchar("gradient", { length: 120 }).notNull().default("from-blue-500 to-purple-600"),
  accent: varchar("accent", { length: 40 }).notNull().default("blue"),
  mode: varchar("mode", { length: 20 }).notNull().default("both"),
  emoji: varchar("emoji", { length: 16 }).notNull().default("🎓"),
  image: text("image").notNull().default(""),
  images: jsonb("images").$type<string[]>().notNull().default([]),
  tags: jsonb("tags").$type<string[]>().notNull().default([]),
  highlights: jsonb("highlights").$type<string[]>().notNull().default([]),
  syllabus: jsonb("syllabus")
    .$type<{ module: string; topics: string[] }[]>()
    .notNull()
    .default([]),
  projects: jsonb("projects").$type<string[]>().notNull().default([]),
  hasCertificate: boolean("has_certificate").notNull().default(true),
  hasPlacement: boolean("has_placement").notNull().default(true),
  hasInternship: boolean("has_internship").notNull().default(false),
  featured: boolean("featured").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  role: varchar("role", { length: 200 }).notNull().default(""),
  company: varchar("company", { length: 160 }).notNull().default(""),
  avatar: varchar("avatar", { length: 16 }).notNull().default("🧑‍🎓"),
  rating: integer("rating").notNull().default(5),
  quote: text("quote").notNull(),
  package: varchar("package", { length: 60 }).notNull().default(""),
});

export const enrollments = pgTable("enrollments", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").references(() => courses.id),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 200 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull().default(""),
  goal: text("goal").notNull().default(""),
  mode: varchar("mode", { length: 20 }).notNull().default("online"),
  status: varchar("status", { length: 40 }).notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 200 }).notNull(),
  subject: varchar("subject", { length: 220 }).notNull().default(""),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  studentCode: varchar("student_code", { length: 40 }).notNull().unique(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 200 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull().default(""),
  course: varchar("course", { length: 200 }).notNull().default(""),
  batch: varchar("batch", { length: 60 }).notNull().default(""),
  photo: text("photo").notNull().default(""),
  bloodGroup: varchar("blood_group", { length: 10 }).notNull().default(""),
  faceEnrolled: boolean("face_enrolled").notNull().default(true),
  issuedOn: varchar("issued_on", { length: 40 }).notNull().default(""),
  validThru: varchar("valid_thru", { length: 40 }).notNull().default(""),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const faceAuthLogs = pgTable("face_auth_logs", {
  id: serial("id").primaryKey(),
  studentCode: varchar("student_code", { length: 40 }).notNull(),
  status: varchar("status", { length: 20 }).notNull().default("success"),
  method: varchar("method", { length: 20 }).notNull().default("face"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Category = typeof categories.$inferSelect;
export type Instructor = typeof instructors.$inferSelect;
export type Course = typeof courses.$inferSelect;
export type Testimonial = typeof testimonials.$inferSelect;
export type Student = typeof students.$inferSelect;
export type FaceAuthLog = typeof faceAuthLogs.$inferSelect;
