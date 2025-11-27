import { Layout } from '@/components/Layout';
import { useTheme } from '@/contexts/ThemeContext';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Flame, Trophy, Calendar as CalendarIcon, TrendingUp, Star } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';

export default function Streaks() {
  const { isDarkMode } = useTheme();
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const activeDays = [
    new Date(2024, 0, 14),
    new Date(2024, 0, 15),
    new Date(2024, 0, 16),
    new Date(2024, 0, 17),
    new Date(2024, 0, 18),
    new Date(2024, 0, 19),
    new Date(2024, 0, 20),
  ];

  const stats = [
    { icon: Flame, label: 'Current Streak', value: '7', unit: 'days', color: 'text-orange-400' },
    { icon: Trophy, label: 'Longest Streak', value: '14', unit: 'days', color: 'text-yellow-400' },
    { icon: TrendingUp, label: 'This Month', value: '20', unit: 'days', color: 'text-green-400' },
    { icon: Star, label: 'Total Days', value: '89', unit: 'active', color: 'text-blue-400' },
  ];

  const milestones = [
    { days: 7, title: 'Week Warrior', achieved: true },
    { days: 14, title: 'Two Week Champion', achieved: true },
    { days: 30, title: 'Monthly Master', achieved: false },
    { days: 60, title: 'Two Month Sage', achieved: false },
    { days: 100, title: 'Century Club', achieved: false },
    { days: 365, title: 'Year of Zen', achieved: false },
  ];

  const recentActivities = [
    { date: '2024-01-20', minutes: 15, activities: ['Meditation', 'Breathing'] },
    { date: '2024-01-19', minutes: 20, activities: ['Meditation', 'Playlist'] },
    { date: '2024-01-18', minutes: 10, activities: ['Breathing', 'Assessment'] },
    { date: '2024-01-17', minutes: 25, activities: ['Meditation', 'Group Session'] },
    { date: '2024-01-16', minutes: 12, activities: ['Breathing'] },
  ];

  const isActiveDay = (day: Date) => {
    return activeDays.some(activeDay => 
      activeDay.toDateString() === day.toDateString()
    );
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-32">
        <div className="mb-8">
          <h2 className={`${isDarkMode ? 'text-white/95' : 'text-slate-900'} font-serif text-4xl mb-2`}>
            Your Streaks
          </h2>
          <p className={isDarkMode ? 'text-white/70' : 'text-slate-700'}>
            Track your daily mindfulness practice and celebrate milestones
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className={`${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-slate-900/5 border-slate-900/10'} backdrop-blur-xl p-6 text-center`}>
              <stat.icon className={`w-10 h-10 mx-auto mb-3 ${stat.color}`} />
              <div className={`${isDarkMode ? 'text-white/95' : 'text-slate-900'} text-4xl font-bold mb-1`} data-testid={`text-stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}>
                {stat.value}
              </div>
              <div className={`${isDarkMode ? 'text-white/70' : 'text-slate-700'} text-sm mb-1`}>{stat.unit}</div>
              <div className={`${isDarkMode ? 'text-white/60' : 'text-slate-600'} text-xs`}>{stat.label}</div>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <Card className={`${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-slate-900/5 border-slate-900/10'} backdrop-blur-xl p-6`}>
            <h3 className={`${isDarkMode ? 'text-white/90' : 'text-slate-900'} text-xl font-medium mb-6`}>
              Activity Calendar
            </h3>
            <div className={`flex justify-center ${isDarkMode ? '[&_.rdp]:text-white/90 [&_.rdp-day_selected]:bg-white/20 [&_.rdp-day]:text-white/70' : ''}`}>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className={isDarkMode ? 'rounded-md border-white/10' : 'rounded-md'}
                modifiers={{ active: activeDays }}
                modifiersClassNames={{
                  active: isDarkMode 
                    ? 'bg-gradient-to-br from-orange-500/30 to-yellow-500/30 text-white font-bold border-orange-400/50' 
                    : 'bg-gradient-to-br from-orange-500/20 to-yellow-500/20 text-slate-900 font-bold border-orange-400/50'
                }}
              />
            </div>
            <p className={`text-center text-sm mt-4 ${isDarkMode ? 'text-white/60' : 'text-slate-600'}`}>
              Days with activity highlighted
            </p>
          </Card>

          <Card className={`${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-slate-900/5 border-slate-900/10'} backdrop-blur-xl p-6`}>
            <h3 className={`${isDarkMode ? 'text-white/90' : 'text-slate-900'} text-xl font-medium mb-6`}>
              Recent Activity
            </h3>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className={`${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-slate-900/5 border-slate-900/10'} backdrop-blur-md rounded-lg p-4 border`}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className={`w-4 h-4 ${isDarkMode ? 'text-white/60' : 'text-slate-600'}`} />
                      <span className={`text-sm font-medium ${isDarkMode ? 'text-white/90' : 'text-slate-900'}`}>
                        {new Date(activity.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {activity.minutes} min
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activity.activities.map((act, idx) => (
                      <span key={idx} className={`text-xs px-2 py-1 rounded ${isDarkMode ? 'bg-white/5 text-white/70' : 'bg-slate-900/5 text-slate-700'}`}>
                        {act}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className={`${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-slate-900/5 border-slate-900/10'} backdrop-blur-xl p-6`}>
          <h3 className={`${isDarkMode ? 'text-white/90' : 'text-slate-900'} text-xl font-medium mb-6`}>
            Milestones
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-slate-900/5 border-slate-900/10'} backdrop-blur-md rounded-lg p-4 border ${
                  milestone.achieved ? 'hover-elevate' : 'opacity-50'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <Trophy className={`w-6 h-6 ${milestone.achieved ? 'text-yellow-400' : isDarkMode ? 'text-white/30' : 'text-slate-900/30'}`} />
                  {milestone.achieved && (
                    <Badge className="text-xs bg-green-500/20 text-green-400 border-green-500/30">
                      Unlocked
                    </Badge>
                  )}
                </div>
                <h4 className={`${isDarkMode ? 'text-white/90' : 'text-slate-900'} font-medium mb-1`}>
                  {milestone.title}
                </h4>
                <p className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-slate-700'}`}>
                  {milestone.days} days streak
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
}
