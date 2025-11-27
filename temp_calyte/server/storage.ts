import { 
  type User, type InsertUser,
  type Assessment, type InsertAssessment,
  type Goal, type InsertGoal,
  type ChatMessage, type InsertChatMessage,
  type GroupSession, type InsertGroupSession,
  type SupportCircle, type InsertSupportCircle,
  type Streak, type InsertStreak,
  type Playlist
} from "@shared/schema";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  verifyPassword(username: string, password: string): Promise<User | null>;
  updateUser(id: string, updates: Partial<User>): Promise<User | undefined>;
  
  getAssessments(userId: string): Promise<Assessment[]>;
  createAssessment(assessment: InsertAssessment): Promise<Assessment>;
  
  getGoals(userId: string): Promise<Goal[]>;
  getGoal(id: string): Promise<Goal | undefined>;
  createGoal(goal: InsertGoal): Promise<Goal>;
  updateGoal(id: string, updates: Partial<Goal>): Promise<Goal | undefined>;
  deleteGoal(id: string): Promise<boolean>;
  
  getChatMessages(limit?: number): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  upvoteChatMessage(id: string): Promise<ChatMessage | undefined>;
  
  getGroupSessions(): Promise<GroupSession[]>;
  createGroupSession(session: InsertGroupSession): Promise<GroupSession>;
  joinGroupSession(id: string): Promise<GroupSession | undefined>;
  
  getSupportCircles(): Promise<SupportCircle[]>;
  createSupportCircle(circle: InsertSupportCircle): Promise<SupportCircle>;
  joinSupportCircle(id: string): Promise<SupportCircle | undefined>;
  
  getStreaks(userId: string): Promise<Streak[]>;
  createStreak(streak: InsertStreak): Promise<Streak>;
  
  getPlaylists(): Promise<Playlist[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private assessments: Map<string, Assessment>;
  private goals: Map<string, Goal>;
  private chatMessages: Map<string, ChatMessage>;
  private groupSessions: Map<string, GroupSession>;
  private supportCircles: Map<string, SupportCircle>;
  private streaks: Map<string, Streak>;
  private playlists: Map<string, Playlist>;

  constructor() {
    this.users = new Map();
    this.assessments = new Map();
    this.goals = new Map();
    this.chatMessages = new Map();
    this.groupSessions = new Map();
    this.supportCircles = new Map();
    this.streaks = new Map();
    this.playlists = new Map();

    this.seedPlaylists();
  }

  private seedPlaylists() {
    const samplePlaylists: Playlist[] = [
      {
        id: randomUUID(),
        title: 'Deep Sleep Sounds',
        description: 'Peaceful ambient sounds for restful sleep',
        tracks: JSON.parse(JSON.stringify([
          { title: 'Ocean Waves', artist: 'Nature Sounds', duration: '8:30' },
          { title: 'Rain on Leaves', artist: 'Ambient Collective', duration: '10:15' },
        ])),
        duration: 360,
        category: 'Sleep',
      },
      {
        id: randomUUID(),
        title: 'Meditation Essentials',
        description: 'Calming tracks for meditation practice',
        tracks: JSON.parse(JSON.stringify([
          { title: 'Tibetan Bowls', artist: 'Meditation Masters', duration: '12:00' },
          { title: 'Gentle Chimes', artist: 'Peaceful Moments', duration: '9:20' },
        ])),
        duration: 540,
        category: 'Meditation',
      },
    ];

    samplePlaylists.forEach(playlist => this.playlists.set(playlist.id, playlist));
  }

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
    const hashedPassword = await bcrypt.hash(insertUser.password, 10);
    const user: User = { 
      ...insertUser,
      password: hashedPassword,
      id,
      email: insertUser.email || null,
      bio: null,
      streak: 0,
      totalMinutes: 0,
      joinedAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async verifyPassword(username: string, password: string): Promise<User | null> {
    const user = await this.getUserByUsername(username);
    if (!user) return null;
    
    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updated = { ...user, ...updates };
    this.users.set(id, updated);
    return updated;
  }

  async getAssessments(userId: string): Promise<Assessment[]> {
    return Array.from(this.assessments.values()).filter(
      (assessment) => assessment.userId === userId
    );
  }

  async createAssessment(insertAssessment: InsertAssessment): Promise<Assessment> {
    const id = randomUUID();
    const assessment: Assessment = {
      ...insertAssessment,
      id,
      score: insertAssessment.score ?? null,
      completedAt: new Date(),
    };
    this.assessments.set(id, assessment);
    return assessment;
  }

  async getGoals(userId: string): Promise<Goal[]> {
    return Array.from(this.goals.values()).filter(
      (goal) => goal.userId === userId
    );
  }

  async getGoal(id: string): Promise<Goal | undefined> {
    return this.goals.get(id);
  }

  async createGoal(insertGoal: InsertGoal): Promise<Goal> {
    const id = randomUUID();
    const goal: Goal = {
      ...insertGoal,
      id,
      description: insertGoal.description ?? null,
      currentProgress: 0,
      completed: false,
      createdAt: new Date(),
    };
    this.goals.set(id, goal);
    return goal;
  }

  async updateGoal(id: string, updates: Partial<Goal>): Promise<Goal | undefined> {
    const goal = this.goals.get(id);
    if (!goal) return undefined;
    
    const updated = { ...goal, ...updates };
    this.goals.set(id, updated);
    return updated;
  }

  async deleteGoal(id: string): Promise<boolean> {
    return this.goals.delete(id);
  }

  async getChatMessages(limit: number = 50): Promise<ChatMessage[]> {
    const messages = Array.from(this.chatMessages.values());
    return messages
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0))
      .slice(0, limit);
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = randomUUID();
    const message: ChatMessage = {
      ...insertMessage,
      id,
      authorId: insertMessage.authorId ?? null,
      parentId: insertMessage.parentId ?? null,
      upvotes: 0,
      createdAt: new Date(),
    };
    this.chatMessages.set(id, message);
    return message;
  }

  async upvoteChatMessage(id: string): Promise<ChatMessage | undefined> {
    const message = this.chatMessages.get(id);
    if (!message) return undefined;
    
    const updated = { ...message, upvotes: message.upvotes + 1 };
    this.chatMessages.set(id, updated);
    return updated;
  }

  async getGroupSessions(): Promise<GroupSession[]> {
    return Array.from(this.groupSessions.values())
      .sort((a, b) => a.scheduledTime.getTime() - b.scheduledTime.getTime());
  }

  async createGroupSession(insertSession: InsertGroupSession): Promise<GroupSession> {
    const id = randomUUID();
    const session: GroupSession = {
      ...insertSession,
      id,
      description: insertSession.description ?? null,
      maxParticipants: insertSession.maxParticipants ?? null,
      participants: 0,
    };
    this.groupSessions.set(id, session);
    return session;
  }

  async joinGroupSession(id: string): Promise<GroupSession | undefined> {
    const session = this.groupSessions.get(id);
    if (!session) return undefined;
    
    const updated = { ...session, participants: session.participants + 1 };
    this.groupSessions.set(id, updated);
    return updated;
  }

  async getSupportCircles(): Promise<SupportCircle[]> {
    return Array.from(this.supportCircles.values());
  }

  async createSupportCircle(insertCircle: InsertSupportCircle): Promise<SupportCircle> {
    const id = randomUUID();
    const circle: SupportCircle = {
      ...insertCircle,
      id,
      description: insertCircle.description ?? null,
      isPrivate: insertCircle.isPrivate ?? false,
      memberCount: 0,
      createdAt: new Date(),
    };
    this.supportCircles.set(id, circle);
    return circle;
  }

  async joinSupportCircle(id: string): Promise<SupportCircle | undefined> {
    const circle = this.supportCircles.get(id);
    if (!circle) return undefined;
    
    const updated = { ...circle, memberCount: circle.memberCount + 1 };
    this.supportCircles.set(id, updated);
    return updated;
  }

  async getStreaks(userId: string): Promise<Streak[]> {
    return Array.from(this.streaks.values()).filter(
      (streak) => streak.userId === userId
    );
  }

  async createStreak(insertStreak: InsertStreak): Promise<Streak> {
    const id = randomUUID();
    const streak: Streak = {
      ...insertStreak,
      id,
      minutesMeditated: insertStreak.minutesMeditated ?? 0,
    };
    this.streaks.set(id, streak);
    return streak;
  }

  async getPlaylists(): Promise<Playlist[]> {
    return Array.from(this.playlists.values());
  }
}

export const storage = new MemStorage();
