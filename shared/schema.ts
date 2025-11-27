import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Support Circles
export const circles = pgTable("circles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  topic: text("topic").notNull(),
  isPrivate: boolean("is_private").notNull().default(false),
  createdBy: varchar("created_by").notNull(),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  memberCount: integer("member_count").notNull().default(1),
});

export const insertCircleSchema = createInsertSchema(circles)
  .pick({
    name: true,
    description: true,
    topic: true,
    isPrivate: true,
  })
  .extend({
    name: z.string().min(3).max(100),
    description: z.string().min(10).max(500),
    topic: z.string().min(2).max(50),
    isPrivate: z.boolean().default(false),
  });

export type InsertCircle = z.infer<typeof insertCircleSchema>;
export type Circle = typeof circles.$inferSelect;

// Circle Members
export const circleMembers = pgTable("circle_members", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  circleId: varchar("circle_id").notNull(),
  userId: varchar("user_id").notNull(),
  joinedAt: timestamp("joined_at").notNull().default(sql`now()`),
});

export type CircleMember = typeof circleMembers.$inferSelect;

// Circle Discussions
export const circleDiscussions = pgTable("circle_discussions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  circleId: varchar("circle_id").notNull(),
  userId: varchar("user_id").notNull(),
  message: text("message").notNull(),
  likes: integer("likes").notNull().default(0),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertDiscussionSchema = createInsertSchema(circleDiscussions)
  .pick({
    message: true,
  })
  .extend({
    message: z.string().min(1).max(1000),
  });

export type InsertDiscussion = z.infer<typeof insertDiscussionSchema>;
export type CircleDiscussion = typeof circleDiscussions.$inferSelect;

// Journal Entries
export const journalEntries = pgTable("journal_entries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  feeling: text("feeling").notNull(),
  mood: varchar("mood").notNull(), // happy, sad, anxious, calm, grateful, etc.
  notes: text("notes").notNull(),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertJournalSchema = createInsertSchema(journalEntries)
  .pick({
    feeling: true,
    mood: true,
    notes: true,
  })
  .extend({
    feeling: z.string().min(1).max(100),
    mood: z.string().min(1).max(50),
    notes: z.string().min(1).max(2000),
  });

export type InsertJournalEntry = z.infer<typeof insertJournalSchema>;
export type JournalEntry = typeof journalEntries.$inferSelect;
