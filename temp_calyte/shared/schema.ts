import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  bio: text("bio"),
  streak: integer("streak").notNull().default(0),
  totalMinutes: integer("total_minutes").notNull().default(0),
  joinedAt: timestamp("joined_at").defaultNow(),
});

export const assessments = pgTable("assessments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  type: text("type").notNull(),
  responses: jsonb("responses").notNull(),
  score: integer("score"),
  completedAt: timestamp("completed_at").defaultNow(),
});

export const goals = pgTable("goals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  targetDays: integer("target_days").notNull(),
  currentProgress: integer("current_progress").notNull().default(0),
  completed: boolean("completed").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const chatMessages = pgTable("chat_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  content: text("content").notNull(),
  authorId: varchar("author_id"),
  authorName: text("author_name").notNull(),
  parentId: varchar("parent_id"),
  upvotes: integer("upvotes").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const groupSessions = pgTable("group_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  host: text("host").notNull(),
  scheduledTime: timestamp("scheduled_time").notNull(),
  duration: integer("duration").notNull(),
  participants: integer("participants").notNull().default(0),
  maxParticipants: integer("max_participants"),
});

export const supportCircles = pgTable("support_circles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  topic: text("topic").notNull(),
  memberCount: integer("member_count").notNull().default(0),
  isPrivate: boolean("is_private").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const streaks = pgTable("streaks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  date: text("date").notNull(),
  minutesMeditated: integer("minutes_meditated").notNull().default(0),
  activitiesCompleted: jsonb("activities_completed").notNull(),
});

export const playlists = pgTable("playlists", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  tracks: jsonb("tracks").notNull(),
  duration: integer("duration").notNull(),
  category: text("category").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
});

export const insertAssessmentSchema = createInsertSchema(assessments).omit({
  id: true,
  completedAt: true,
});

export const insertGoalSchema = createInsertSchema(goals).omit({
  id: true,
  createdAt: true,
  currentProgress: true,
  completed: true,
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({
  id: true,
  createdAt: true,
  upvotes: true,
});

export const insertGroupSessionSchema = createInsertSchema(groupSessions).omit({
  id: true,
  participants: true,
});

export const insertSupportCircleSchema = createInsertSchema(supportCircles).omit({
  id: true,
  createdAt: true,
  memberCount: true,
});

export const insertStreakSchema = createInsertSchema(streaks).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertAssessment = z.infer<typeof insertAssessmentSchema>;
export type Assessment = typeof assessments.$inferSelect;
export type InsertGoal = z.infer<typeof insertGoalSchema>;
export type Goal = typeof goals.$inferSelect;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertGroupSession = z.infer<typeof insertGroupSessionSchema>;
export type GroupSession = typeof groupSessions.$inferSelect;
export type InsertSupportCircle = z.infer<typeof insertSupportCircleSchema>;
export type SupportCircle = typeof supportCircles.$inferSelect;
export type InsertStreak = z.infer<typeof insertStreakSchema>;
export type Streak = typeof streaks.$inferSelect;
export type Playlist = typeof playlists.$inferSelect;
