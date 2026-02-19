import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Portfolio projects table.
 * Each project has a title (in 3 languages), an image stored in S3,
 * and a display order for the gallery.
 */
export const projects = mysqlTable("projects", {
  id: int("id").autoincrement().primaryKey(),
  /** Title in English */
  titleEn: varchar("titleEn", { length: 500 }).notNull(),
  /** Title in Spanish */
  titleEs: varchar("titleEs", { length: 500 }).notNull(),
  /** Title in Valencian */
  titleVal: varchar("titleVal", { length: 500 }).notNull(),
  /** S3 storage key for the image */
  imageKey: varchar("imageKey", { length: 1000 }).notNull(),
  /** Public URL of the image (cached from S3) */
  imageUrl: text("imageUrl").notNull(),
  /** Display order in the gallery (lower = first) */
  sortOrder: int("sortOrder").default(0).notNull(),
  /** Whether the project is visible in the gallery */
  visible: mysqlEnum("visible", ["yes", "no"]).default("yes").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Project = typeof projects.$inferSelect;
export type InsertProject = typeof projects.$inferInsert;
