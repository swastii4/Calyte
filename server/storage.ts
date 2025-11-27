import { type User, type InsertUser, type Circle, type InsertCircle, type CircleMember, type CircleDiscussion, type InsertDiscussion, type JournalEntry, type InsertJournalEntry } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Circles
  createCircle(circle: InsertCircle & { createdBy: string }): Promise<Circle>;
  getCircle(id: string): Promise<Circle | undefined>;
  getAllCircles(): Promise<Circle[]>;
  
  // Circle Members
  joinCircle(circleId: string, userId: string): Promise<CircleMember>;
  leaveCircle(circleId: string, userId: string): Promise<boolean>;
  getJoinedCircles(userId: string): Promise<Circle[]>;
  getCircleMembers(circleId: string): Promise<CircleMember[]>;
  isCircleMember(circleId: string, userId: string): Promise<boolean>;
  
  // Circle Discussions
  createDiscussion(circleId: string, userId: string, discussion: InsertDiscussion): Promise<CircleDiscussion>;
  getCircleDiscussions(circleId: string, limit?: number): Promise<CircleDiscussion[]>;
  likeDiscussion(discussionId: string): Promise<CircleDiscussion>;

  // Journal Entries
  createJournalEntry(userId: string, entry: InsertJournalEntry): Promise<JournalEntry>;
  getUserJournalEntries(userId: string, limit?: number): Promise<JournalEntry[]>;
  getJournalEntry(id: string): Promise<JournalEntry | undefined>;
  deleteJournalEntry(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private circles: Map<string, Circle>;
  private circleMembers: Map<string, CircleMember>;
  private discussions: Map<string, CircleDiscussion>;
  private journalEntries: Map<string, JournalEntry>;

  constructor() {
    this.users = new Map();
    this.circles = new Map();
    this.circleMembers = new Map();
    this.discussions = new Map();
    this.journalEntries = new Map();
  }

  // ===== Users =====
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // ===== Circles =====
  async createCircle(circle: InsertCircle & { createdBy: string }): Promise<Circle> {
    const id = randomUUID();
    const newCircle: Circle = {
      id,
      name: circle.name,
      description: circle.description,
      topic: circle.topic,
      isPrivate: circle.isPrivate || false,
      createdBy: circle.createdBy,
      createdAt: new Date(),
      memberCount: 1,
    };
    this.circles.set(id, newCircle);
    
    // Auto-join creator
    await this.joinCircle(id, circle.createdBy);
    
    return newCircle;
  }

  async getCircle(id: string): Promise<Circle | undefined> {
    return this.circles.get(id);
  }

  async getAllCircles(): Promise<Circle[]> {
    return Array.from(this.circles.values());
  }

  // ===== Circle Members =====
  async joinCircle(circleId: string, userId: string): Promise<CircleMember> {
    const isAlreadyMember = await this.isCircleMember(circleId, userId);
    if (isAlreadyMember) {
      throw new Error("User is already a member of this circle");
    }

    const id = randomUUID();
    const member: CircleMember = {
      id,
      circleId,
      userId,
      joinedAt: new Date(),
    };
    this.circleMembers.set(id, member);

    // Update member count
    const circle = await this.getCircle(circleId);
    if (circle) {
      circle.memberCount++;
    }

    return member;
  }

  async leaveCircle(circleId: string, userId: string): Promise<boolean> {
    const memberEntry = Array.from(this.circleMembers.entries()).find(
      ([_, member]) => member.circleId === circleId && member.userId === userId
    );

    if (!memberEntry) return false;

    this.circleMembers.delete(memberEntry[0]);

    // Update member count
    const circle = await this.getCircle(circleId);
    if (circle && circle.memberCount > 0) {
      circle.memberCount--;
    }

    return true;
  }

  async getJoinedCircles(userId: string): Promise<Circle[]> {
    const memberCircleIds = Array.from(this.circleMembers.values())
      .filter(m => m.userId === userId)
      .map(m => m.circleId);

    return Array.from(this.circles.values()).filter(c => memberCircleIds.includes(c.id));
  }

  async getCircleMembers(circleId: string): Promise<CircleMember[]> {
    return Array.from(this.circleMembers.values()).filter(m => m.circleId === circleId);
  }

  async isCircleMember(circleId: string, userId: string): Promise<boolean> {
    return Array.from(this.circleMembers.values()).some(
      m => m.circleId === circleId && m.userId === userId
    );
  }

  // ===== Circle Discussions =====
  async createDiscussion(circleId: string, userId: string, discussion: InsertDiscussion): Promise<CircleDiscussion> {
    const id = randomUUID();
    const newDiscussion: CircleDiscussion = {
      id,
      circleId,
      userId,
      message: discussion.message,
      likes: 0,
      createdAt: new Date(),
    };
    this.discussions.set(id, newDiscussion);
    return newDiscussion;
  }

  async getCircleDiscussions(circleId: string, limit: number = 10): Promise<CircleDiscussion[]> {
    const discussions = Array.from(this.discussions.values())
      .filter(d => d.circleId === circleId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
    
    return discussions;
  }

  async likeDiscussion(discussionId: string): Promise<CircleDiscussion> {
    const discussion = Array.from(this.discussions.values()).find(d => d.id === discussionId);
    if (!discussion) {
      throw new Error("Discussion not found");
    }
    discussion.likes++;
    return discussion;
  }

  // ===== Journal Entries =====
  async createJournalEntry(userId: string, entry: InsertJournalEntry): Promise<JournalEntry> {
    const id = randomUUID();
    const newEntry: JournalEntry = {
      id,
      userId,
      feeling: entry.feeling,
      mood: entry.mood,
      notes: entry.notes,
      createdAt: new Date(),
    };
    this.journalEntries.set(id, newEntry);
    return newEntry;
  }

  async getUserJournalEntries(userId: string, limit: number = 10): Promise<JournalEntry[]> {
    return Array.from(this.journalEntries.values())
      .filter(e => e.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  async getJournalEntry(id: string): Promise<JournalEntry | undefined> {
    return this.journalEntries.get(id);
  }

  async deleteJournalEntry(id: string): Promise<boolean> {
    return this.journalEntries.delete(id);
  }
}

export const storage = new MemStorage();
