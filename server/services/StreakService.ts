import { Streak } from '../models/Streak';
import mongoose from 'mongoose';

export class StreakService {
  async getOrCreateStreak(userId: string): Promise<any> {
    let streak = await Streak.findOne({ userId: new mongoose.Types.ObjectId(userId) });
    
    if (!streak) {
      streak = await Streak.create({
        userId: new mongoose.Types.ObjectId(userId),
      });
    }

    return streak;
  }

  async recordMeditationActivity(userId: string, minutes: number): Promise<void> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await Streak.findOneAndUpdate(
      { userId: new mongoose.Types.ObjectId(userId) },
      {
        $inc: {
          totalMeditationMinutes: minutes,
          'dailyActivities.$[elem].meditationMinutes': minutes
        }
      },
      { arrayFilters: [{ 'elem.date': today }] }
    );
  }

  async updateStreak(userId: string): Promise<any> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const streak = await Streak.findOne({ userId: new mongoose.Types.ObjectId(userId) });
    if (!streak) throw new Error('Streak not found');

    const lastActive = streak.lastActiveDate ? new Date(streak.lastActiveDate) : null;
    const isConsecutive = lastActive && 
      (today.getTime() - new Date(lastActive).getTime()) === 24 * 60 * 60 * 1000;

    if (isConsecutive) {
      streak.currentStreak += 1;
    } else {
      streak.currentStreak = 1;
    }

    if (streak.currentStreak > streak.longestStreak) {
      streak.longestStreak = streak.currentStreak;
    }

    streak.lastActiveDate = today;
    return streak.save();
  }
}

export const streakService = new StreakService();
