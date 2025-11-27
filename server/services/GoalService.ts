import { Goal, IGoal } from '../models/Goal';
import { Streak } from '../models/Streak';
import mongoose from 'mongoose';

export class GoalService {
  async getGoalsByUser(userId: string): Promise<IGoal[]> {
    return Goal.find({ userId: new mongoose.Types.ObjectId(userId) }).sort({ createdAt: -1 });
  }

  async createGoal(userId: string, data: any): Promise<IGoal> {
    return Goal.create({
      userId: new mongoose.Types.ObjectId(userId),
      ...data,
    });
  }

  async updateGoal(goalId: string, data: any): Promise<IGoal | null> {
    return Goal.findByIdAndUpdate(goalId, data, { new: true });
  }

  async deleteGoal(goalId: string): Promise<IGoal | null> {
    return Goal.findByIdAndDelete(goalId);
  }

  async checkInGoal(goalId: string, userId: string): Promise<IGoal | null> {
    const goal = await Goal.findById(goalId);
    if (!goal || goal.userId.toString() !== userId) {
      throw new Error('Goal not found');
    }

    const today = new Date();
    const lastCheckin = goal.lastCheckedIn ? new Date(goal.lastCheckedIn) : null;
    const isConsecutiveDay = lastCheckin && 
      (today.getTime() - new Date(lastCheckin).getTime()) < 24 * 60 * 60 * 1000 + 1000;

    let streakIncrement = 0;
    if (!lastCheckin || !isConsecutiveDay) {
      streakIncrement = 1;
    }

    goal.currentProgress = Math.min(goal.currentProgress + 1, goal.targetDays);
    goal.streakCount += streakIncrement;
    goal.lastCheckedIn = today;
    if (goal.currentProgress >= goal.targetDays) {
      goal.isCompleted = true;
    }

    return goal.save();
  }
}

export const goalService = new GoalService();
