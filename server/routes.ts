import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema,
  insertCircleSchema,
  insertDiscussionSchema,
  insertJournalSchema,
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(httpServer: Server, app: Express): Promise<void> {
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

  // Circle routes (using actual implemented storage)
  app.get("/api/circles", async (req, res) => {
    try {
      const circles = await storage.getAllCircles();
      res.json(circles);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/circles", async (req, res) => {
    try {
      const data = insertCircleSchema.parse(req.body);
      const circle = await storage.createCircle({ ...data, createdBy: "test-user" });
      res.json(circle);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/circles/:id", async (req, res) => {
    try {
      const circle = await storage.getCircle(req.params.id);
      res.json(circle || { error: "Circle not found" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/circles/:id/join", async (req, res) => {
    try {
      const member = await storage.joinCircle(req.params.id, "test-user");
      res.json(member);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/circles/:id/leave", async (req, res) => {
    try {
      const success = await storage.leaveCircle(req.params.id, "test-user");
      res.json({ success });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/circles/:id/members", async (req, res) => {
    try {
      const members = await storage.getCircleMembers(req.params.id);
      res.json(members);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/circles/:id/discussions", async (req, res) => {
    try {
      const limit = Math.min(parseInt(req.query.limit as string) || 10, 50);
      const discussions = await storage.getCircleDiscussions(req.params.id, limit);
      res.json(discussions);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/circles/:id/discussions", async (req, res) => {
    try {
      const data = insertDiscussionSchema.parse(req.body);
      const discussion = await storage.createDiscussion(req.params.id, "guest-user", data);
      res.status(201).json(discussion);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/circles/discussions/:id/like", async (req, res) => {
    try {
      const discussion = await storage.likeDiscussion(req.params.id);
      res.json(discussion);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Journal endpoints
  app.post("/api/journal", async (req, res) => {
    try {
      const data = insertJournalSchema.parse(req.body);
      const userId = req.body.userId || "guest-user";
      const entry = await storage.createJournalEntry(userId, data);
      res.status(201).json(entry);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/journal", async (req, res) => {
    try {
      const userId = req.query.userId as string || "guest-user";
      const limit = Math.min(parseInt(req.query.limit as string) || 10, 50);
      const entries = await storage.getUserJournalEntries(userId, limit);
      res.json(entries);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/journal/:id", async (req, res) => {
    try {
      const entry = await storage.getJournalEntry(req.params.id);
      if (!entry) {
        res.status(404).json({ error: "Journal entry not found" });
        return;
      }
      res.json(entry);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/journal/:id", async (req, res) => {
    try {
      const success = await storage.deleteJournalEntry(req.params.id);
      res.json({ success });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Chat endpoint - Chatbase integration
  app.post("/api/chat/messages", async (req, res) => {
    try {
      const { content } = req.body;
      if (!content) {
        res.status(400).json({ error: "Content is required" });
        return;
      }

      const chatbaseAgentId = "6aWohxDZKFG3KTXT_tO5S";

      // Try multiple Chatbase API endpoints
      let aiResponse = null;
      
      // Attempt 1: Public embed endpoint
      try {
        const embedResponse = await fetch(`https://www.chatbase.co/api/v1/chatbots/${chatbaseAgentId}/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: content,
          }),
        });

        if (embedResponse.ok) {
          const data = await embedResponse.json();
          aiResponse = data.text || data.response || data.answer || data.message;
        }
      } catch (e) {
        console.log("Embed endpoint failed, trying alternative...");
      }

      // Attempt 2: Alternative endpoint without auth
      if (!aiResponse) {
        try {
          const altResponse = await fetch(`https://www.chatbase.co/api/chat`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              chatbotId: chatbaseAgentId,
              message: content,
              sessionId: Date.now().toString(),
            }),
          });

          if (altResponse.ok) {
            const data = await altResponse.json();
            aiResponse = data.text || data.response || data.answer || data.message;
          }
        } catch (e) {
          console.log("Alternative endpoint failed");
        }
      }

      // Fallback response
      if (!aiResponse) {
        aiResponse = "I'm here to support you. How can I help?";
      }

      res.json({
        aiMessage: {
          content: aiResponse,
        }
      });
    } catch (error: any) {
      console.error("Chat error:", error.message);
      res.json({
        aiMessage: {
          content: "I'm here to support you. Please try your message again.",
        }
      });
    }
  });
}
