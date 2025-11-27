import { Layout } from '@/components/Layout';
import { useTheme } from '@/contexts/ThemeContext';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Lock, Globe, UserPlus } from 'lucide-react';

export default function Circles() {
  const { isDarkMode } = useTheme();
  const [circles] = useState([
    {
      id: 1,
      name: 'Anxiety Warriors',
      description: 'A supportive community for those managing anxiety disorders',
      topic: 'Anxiety',
      memberCount: 156,
      isPrivate: false,
    },
    {
      id: 2,
      name: 'Mindful Parents',
      description: 'Parents practicing mindfulness while raising children',
      topic: 'Parenting',
      memberCount: 89,
      isPrivate: false,
    },
    {
      id: 3,
      name: 'Depression Support',
      description: 'Safe space for sharing experiences with depression',
      topic: 'Depression',
      memberCount: 203,
      isPrivate: true,
    },
    {
      id: 4,
      name: 'Meditation Beginners',
      description: 'Learn meditation basics with fellow beginners',
      topic: 'Meditation',
      memberCount: 124,
      isPrivate: false,
    },
    {
      id: 5,
      name: 'Work-Life Balance',
      description: 'Professionals seeking harmony between work and personal life',
      topic: 'Lifestyle',
      memberCount: 92,
      isPrivate: false,
    },
    {
      id: 6,
      name: 'Grief & Loss',
      description: 'Compassionate support for those experiencing loss',
      topic: 'Grief',
      memberCount: 67,
      isPrivate: true,
    },
  ]);

  const [joined, setJoined] = useState<number[]>([1, 4]);

  const handleJoin = (id: number) => {
    if (joined.includes(id)) {
      setJoined(joined.filter(circleId => circleId !== id));
    } else {
      setJoined([...joined, id]);
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-32">
        <div className="mb-8">
          <h2 className={`${isDarkMode ? 'text-white/95' : 'text-slate-900'} font-serif text-4xl mb-2`}>
            Support Circles
          </h2>
          <p className={isDarkMode ? 'text-white/70' : 'text-slate-700'}>
            Find your community and connect with others on similar journeys
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {circles.map((circle) => {
            const isJoined = joined.includes(circle.id);
            
            return (
              <Card key={circle.id} className={`${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-slate-900/5 border-slate-900/10'} backdrop-blur-xl p-6 flex flex-col`}>
                <div className="flex items-start justify-between mb-4">
                  <Badge variant="outline" className="text-xs">
                    {circle.topic}
                  </Badge>
                  <div className="flex gap-2">
                    {circle.isPrivate ? (
                      <Lock className={`w-4 h-4 ${isDarkMode ? 'text-white/60' : 'text-slate-600'}`} />
                    ) : (
                      <Globe className={`w-4 h-4 ${isDarkMode ? 'text-white/60' : 'text-slate-600'}`} />
                    )}
                    {isJoined && (
                      <Badge className="text-xs bg-green-500/20 text-green-400 border-green-500/30">
                        Joined
                      </Badge>
                    )}
                  </div>
                </div>

                <h3 className={`${isDarkMode ? 'text-white/95' : 'text-slate-900'} text-xl font-medium mb-3`}>
                  {circle.name}
                </h3>
                
                <p className={`${isDarkMode ? 'text-white/70' : 'text-slate-700'} mb-6 text-sm flex-1`}>
                  {circle.description}
                </p>

                <div className="flex items-center gap-2 mb-4">
                  <Users className={`w-4 h-4 ${isDarkMode ? 'text-white/60' : 'text-slate-600'}`} />
                  <span className={`text-sm ${isDarkMode ? 'text-white/80' : 'text-slate-800'}`}>
                    {circle.memberCount} {circle.memberCount === 1 ? 'member' : 'members'}
                  </span>
                </div>

                <Button
                  onClick={() => handleJoin(circle.id)}
                  variant={isJoined ? 'outline' : 'default'}
                  className="w-full gap-2"
                  data-testid={`button-join-circle-${circle.id}`}
                >
                  <UserPlus className="w-4 h-4" />
                  {isJoined ? 'Leave Circle' : circle.isPrivate ? 'Request to Join' : 'Join Circle'}
                </Button>
              </Card>
            );
          })}
        </div>

        <Card className={`${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-slate-900/5 border-slate-900/10'} backdrop-blur-xl p-8 text-center mt-12`}>
          <Users className={`w-12 h-12 mx-auto mb-4 ${isDarkMode ? 'text-white/70' : 'text-slate-700'}`} />
          <h3 className={`${isDarkMode ? 'text-white/90' : 'text-slate-900'} text-xl font-medium mb-2`}>
            Create Your Own Circle
          </h3>
          <p className={`${isDarkMode ? 'text-white/70' : 'text-slate-700'} mb-6 max-w-md mx-auto`}>
            Start a new support community around a topic that matters to you
          </p>
          <Button variant="outline" data-testid="button-create-circle">
            Create Circle
          </Button>
        </Card>
      </div>
    </Layout>
  );
}
