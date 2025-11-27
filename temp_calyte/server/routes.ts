import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema,
  insertAssessmentSchema,
  insertGoalSchema,
  insertChatMessageSchema,
  insertGroupSessionSchema,
  insertSupportCircleSchema,
  insertStreakSchema,
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/auth/signup", async (req, res) => {
    try {
      const data = insertUserSchema.parse(req.body);
      const existing = await storage.getUserByUsername(data.username);
      if (existing) {
        res.status(400).json({ error: "Username already exists" });
        return;
      }
      const user = await storage.createUser(data);
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(400).json({ error: "Invalid user data" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        res.status(400).json({ error: "Username and password required" });
        return;
      }
      const user = await storage.verifyPassword(username, password);
      if (!user) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }
      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    const user = await storage.getUser(req.params.id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  });

  const updateUserSchema = z.object({
    bio: z.string().optional(),
    email: z.string().email().optional(),
  });

  app.patch("/api/users/:id", async (req, res) => {
    try {
      const data = updateUserSchema.parse(req.body);
      const user = await storage.updateUser(req.params.id, data);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(400).json({ error: "Invalid update data" });
    }
  });

  app.get("/api/assessments/:userId", async (req, res) => {
    const assessments = await storage.getAssessments(req.params.userId);
    res.json(assessments);
  });

  app.post("/api/assessments", async (req, res) => {
    try {
      const data = insertAssessmentSchema.parse(req.body);
      const assessment = await storage.createAssessment(data);
      res.json(assessment);
    } catch (error) {
      res.status(400).json({ error: "Invalid assessment data" });
    }
  });

  app.get("/api/goals/:userId", async (req, res) => {
    const goals = await storage.getGoals(req.params.userId);
    res.json(goals);
  });

  app.post("/api/goals", async (req, res) => {
    try {
      const data = insertGoalSchema.parse(req.body);
      const goal = await storage.createGoal(data);
      res.json(goal);
    } catch (error) {
      res.status(400).json({ error: "Invalid goal data" });
    }
  });

  const updateGoalSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    currentProgress: z.number().optional(),
    completed: z.boolean().optional(),
  });

  app.patch("/api/goals/:id", async (req, res) => {
    try {
      const data = updateGoalSchema.parse(req.body);
      const goal = await storage.updateGoal(req.params.id, data);
      if (!goal) {
        res.status(404).json({ error: "Goal not found" });
        return;
      }
      res.json(goal);
    } catch (error) {
      res.status(400).json({ error: "Invalid update data" });
    }
  });

  app.delete("/api/goals/:id", async (req, res) => {
    const deleted = await storage.deleteGoal(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: "Goal not found" });
      return;
    }
    res.json({ success: true });
  });

  app.get("/api/chat/messages", async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
    const messages = await storage.getChatMessages(limit);
    res.json(messages);
  });

  app.post("/api/chat/messages", async (req, res) => {
    try {
      const data = insertChatMessageSchema.parse(req.body);
      const message = await storage.createChatMessage(data);
      res.json(message);
    } catch (error) {
      res.status(400).json({ error: "Invalid message data" });
    }
  });

  app.post("/api/chat/messages/:id/upvote", async (req, res) => {
    const message = await storage.upvoteChatMessage(req.params.id);
    if (!message) {
      res.status(404).json({ error: "Message not found" });
      return;
    }
    res.json(message);
  });

  app.get("/api/sessions", async (req, res) => {
    const sessions = await storage.getGroupSessions();
    res.json(sessions);
  });

  app.post("/api/sessions", async (req, res) => {
    try {
      const data = insertGroupSessionSchema.parse(req.body);
      const session = await storage.createGroupSession(data);
      res.json(session);
    } catch (error) {
      res.status(400).json({ error: "Invalid session data" });
    }
  });

  app.post("/api/sessions/:id/join", async (req, res) => {
    const session = await storage.joinGroupSession(req.params.id);
    if (!session) {
      res.status(404).json({ error: "Session not found" });
      return;
    }
    res.json(session);
  });

  app.get("/api/circles", async (req, res) => {
    const circles = await storage.getSupportCircles();
    res.json(circles);
  });

  app.post("/api/circles", async (req, res) => {
    try {
      const data = insertSupportCircleSchema.parse(req.body);
      const circle = await storage.createSupportCircle(data);
      res.json(circle);
    } catch (error) {
      res.status(400).json({ error: "Invalid circle data" });
    }
  });

  app.post("/api/circles/:id/join", async (req, res) => {
    const circle = await storage.joinSupportCircle(req.params.id);
    if (!circle) {
      res.status(404).json({ error: "Circle not found" });
      return;
    }
    res.json(circle);
  });

  app.get("/api/streaks/:userId", async (req, res) => {
    const streaks = await storage.getStreaks(req.params.userId);
    res.json(streaks);
  });

  app.post("/api/streaks", async (req, res) => {
    try {
      const data = insertStreakSchema.parse(req.body);
      const streak = await storage.createStreak(data);
      res.json(streak);
    } catch (error) {
      res.status(400).json({ error: "Invalid streak data" });
    }
  });

  app.get("/api/playlists", async (req, res) => {
    const playlists = await storage.getPlaylists();
    res.json(playlists);
  });

  const httpServer = createServer(app);

  return httpServer;
}
