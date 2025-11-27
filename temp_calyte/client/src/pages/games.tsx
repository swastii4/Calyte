import { Layout } from '@/components/Layout';
import { useTheme } from '@/contexts/ThemeContext';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Gamepad2, Sparkles, Palette, Compass, Flower, Grid3x3 } from 'lucide-react';

export default function Games() {
  const { isDarkMode } = useTheme();
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [zenGardenItems, setZenGardenItems] = useState<{x: number, y: number, type: string}[]>([]);
  const [colorFlowColors, setColorFlowColors] = useState<string[]>([]);
  const [tetrisBoard, setTetrisBoard] = useState<number[][]>(Array(20).fill(null).map(() => Array(10).fill(0)));
  const [score, setScore] = useState(0);

  const games = [
    {
      id: 'zen-garden',
      title: 'Zen Garden',
      description: 'Create and maintain your digital garden',
      duration: '5-15 min',
      icon: Flower,
      color: 'from-green-400/20 to-emerald-500/20'
    },
    {
      id: 'color-flow',
      title: 'Color Flow',
      description: 'Relaxing color matching puzzle',
      duration: '10-20 min',
      icon: Palette,
      color: 'from-purple-400/20 to-pink-500/20'
    },
    {
      id: 'mindful-maze',
      title: 'Mindful Maze',
      description: 'Navigate through peaceful labyrinths',
      duration: '5-10 min',
      icon: Compass,
      color: 'from-blue-400/20 to-cyan-500/20'
    },
    {
      id: 'pattern-peace',
      title: 'Pattern Peace',
      description: 'Create calming mandala patterns',
      duration: '15-30 min',
      icon: Sparkles,
      color: 'from-yellow-400/20 to-orange-500/20'
    },
    {
      id: 'tetris',
      title: 'Calm Tetris',
      description: 'Classic block puzzle with relaxing vibes',
      duration: '10-20 min',
      icon: Grid3x3,
      color: 'from-indigo-400/20 to-violet-500/20'
    },
  ];

  const handleZenGardenClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const types = ['flower', 'leaf', 'stone', 'plant'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    setZenGardenItems([...zenGardenItems, { x, y, type: randomType }]);
  };

  const generateColorFlow = () => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];
    const newColors = Array(9).fill(null).map(() => colors[Math.floor(Math.random() * colors.length)]);
    setColorFlowColors(newColors);
  };

  const renderGame = () => {
    switch (activeGame) {
      case 'zen-garden':
        return (
          <Card className={`${isDarkMode ? 'bg-gradient-to-br from-green-900/20 to-emerald-800/20 border-white/10' : 'bg-gradient-to-br from-green-50 to-emerald-100 border-green-200'} p-8 relative`}>
            <h3 className={`${isDarkMode ? 'text-white/95' : 'text-slate-900'} text-2xl font-serif mb-4 text-center`}>
              Zen Garden
            </h3>
            <p className={`text-center mb-6 ${isDarkMode ? 'text-white/70' : 'text-slate-700'}`}>
              Click anywhere to plant elements in your garden
            </p>
            <div 
              onClick={handleZenGardenClick}
              className={`w-full h-96 rounded-xl ${isDarkMode ? 'bg-green-900/30' : 'bg-green-100'} cursor-pointer relative overflow-hidden border-2 ${isDarkMode ? 'border-green-700/50' : 'border-green-300'}`}
            >
              {zenGardenItems.map((item, index) => (
                <div
                  key={index}
                  style={{
                    position: 'absolute',
                    left: `${item.x}px`,
                    top: `${item.y}px`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  {item.type === 'flower' && (
                    <Flower className="w-6 h-6 text-pink-400" />
                  )}
                  {item.type === 'leaf' && (
                    <div className="w-6 h-6 bg-green-400 rounded-full opacity-70" />
                  )}
                  {item.type === 'stone' && (
                    <div className="w-5 h-5 bg-gray-400 rounded-sm" />
                  )}
                  {item.type === 'plant' && (
                    <Sparkles className="w-5 h-5 text-green-500" />
                  )}
                </div>
              ))}
              <div className={`absolute inset-0 flex items-center justify-center ${zenGardenItems.length === 0 ? '' : 'opacity-0'}`}>
                <p className={isDarkMode ? 'text-white/50' : 'text-slate-500'}>Click to begin...</p>
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-6">
              <Button onClick={() => setZenGardenItems([])}>Clear Garden</Button>
              <Button variant="outline" onClick={() => setActiveGame(null)}>Back to Games</Button>
            </div>
          </Card>
        );

      case 'color-flow':
        return (
          <Card className={`${isDarkMode ? 'bg-gradient-to-br from-purple-900/20 to-pink-800/20 border-white/10' : 'bg-gradient-to-br from-purple-50 to-pink-100 border-purple-200'} p-8`}>
            <h3 className={`${isDarkMode ? 'text-white/95' : 'text-slate-900'} text-2xl font-serif mb-4 text-center`}>
              Color Flow
            </h3>
            <p className={`text-center mb-6 ${isDarkMode ? 'text-white/70' : 'text-slate-700'}`}>
              Match the colors to create harmony
            </p>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {colorFlowColors.map((color, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-lg transition-all hover-elevate active-elevate-2 cursor-pointer"
                  style={{ backgroundColor: color }}
                  onClick={() => setScore(score + 1)}
                />
              ))}
            </div>
            <div className="text-center mb-4">
              <div className={`${isDarkMode ? 'text-white/95' : 'text-slate-900'} text-4xl font-bold mb-2`}>
                {score}
              </div>
              <p className={isDarkMode ? 'text-white/70' : 'text-slate-700'}>Points</p>
            </div>
            <div className="flex justify-center gap-4">
              <Button onClick={generateColorFlow}>New Pattern</Button>
              <Button variant="outline" onClick={() => setActiveGame(null)}>Back to Games</Button>
            </div>
          </Card>
        );

      case 'mindful-maze':
        return (
          <Card className={`${isDarkMode ? 'bg-gradient-to-br from-blue-900/20 to-cyan-800/20 border-white/10' : 'bg-gradient-to-br from-blue-50 to-cyan-100 border-blue-200'} p-8`}>
            <h3 className={`${isDarkMode ? 'text-white/95' : 'text-slate-900'} text-2xl font-serif mb-4 text-center`}>
              Mindful Maze
            </h3>
            <p className={`text-center mb-6 ${isDarkMode ? 'text-white/70' : 'text-slate-700'}`}>
              Navigate peacefully through the labyrinth
            </p>
            <div className={`w-full aspect-square rounded-xl ${isDarkMode ? 'bg-blue-900/30 border-blue-700/50' : 'bg-blue-100 border-blue-300'} flex items-center justify-center border-2`}>
              <svg className="w-full h-full p-8" viewBox="0 0 200 200">
                <path
                  d="M 10 10 L 10 190 L 190 190 L 190 10 L 10 10 M 30 30 L 30 170 L 170 170 L 170 30 L 30 30 M 50 50 L 50 150 L 150 150 L 150 50 L 50 50"
                  fill="none"
                  stroke={isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'}
                  strokeWidth="3"
                />
                <circle cx="100" cy="100" r="8" fill={isDarkMode ? '#60A5FA' : '#3B82F6'} />
              </svg>
            </div>
            <div className="flex justify-center gap-4 mt-6">
              <Button onClick={() => setActiveGame(null)}>Back to Games</Button>
            </div>
          </Card>
        );

      case 'pattern-peace':
        return (
          <Card className={`${isDarkMode ? 'bg-gradient-to-br from-yellow-900/20 to-orange-800/20 border-white/10' : 'bg-gradient-to-br from-yellow-50 to-orange-100 border-yellow-200'} p-8`}>
            <h3 className={`${isDarkMode ? 'text-white/95' : 'text-slate-900'} text-2xl font-serif mb-4 text-center`}>
              Pattern Peace
            </h3>
            <p className={`text-center mb-6 ${isDarkMode ? 'text-white/70' : 'text-slate-700'}`}>
              Create beautiful mandala patterns
            </p>
            <div className={`w-full aspect-square rounded-full ${isDarkMode ? 'bg-yellow-900/30 border-yellow-700/50' : 'bg-yellow-100 border-yellow-300'} flex items-center justify-center border-2 overflow-hidden`}>
              <svg className="w-full h-full" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="90" fill="none" stroke={isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'} strokeWidth="1" />
                <circle cx="100" cy="100" r="70" fill="none" stroke={isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'} strokeWidth="1" />
                <circle cx="100" cy="100" r="50" fill="none" stroke={isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'} strokeWidth="1" />
                <circle cx="100" cy="100" r="30" fill="none" stroke={isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'} strokeWidth="1" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
                  <line
                    key={angle}
                    x1="100"
                    y1="100"
                    x2={100 + 90 * Math.cos(angle * Math.PI / 180)}
                    y2={100 + 90 * Math.sin(angle * Math.PI / 180)}
                    stroke={isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}
                    strokeWidth="1"
                  />
                ))}
              </svg>
            </div>
            <div className="flex justify-center gap-4 mt-6">
              <Button onClick={() => setActiveGame(null)}>Back to Games</Button>
            </div>
          </Card>
        );

      case 'tetris':
        return (
          <Card className={`${isDarkMode ? 'bg-gradient-to-br from-indigo-900/20 to-violet-800/20 border-white/10' : 'bg-gradient-to-br from-indigo-50 to-violet-100 border-indigo-200'} p-8`}>
            <h3 className={`${isDarkMode ? 'text-white/95' : 'text-slate-900'} text-2xl font-serif mb-4 text-center`}>
              Calm Tetris
            </h3>
            <p className={`text-center mb-6 ${isDarkMode ? 'text-white/70' : 'text-slate-700'}`}>
              Classic block puzzle with peaceful rhythm
            </p>
            <div className="flex justify-center mb-6">
              <div className={`grid grid-cols-10 gap-1 ${isDarkMode ? 'bg-indigo-900/30 border-indigo-700/50' : 'bg-indigo-100 border-indigo-300'} p-4 rounded-lg border-2`}>
                {tetrisBoard.map((row, i) =>
                  row.map((cell, j) => (
                    <div
                      key={`${i}-${j}`}
                      className={`w-6 h-6 rounded-sm ${cell ? 'bg-indigo-500' : isDarkMode ? 'bg-white/5' : 'bg-white/50'}`}
                    />
                  ))
                )}
              </div>
            </div>
            <div className="text-center mb-4">
              <div className={`${isDarkMode ? 'text-white/95' : 'text-slate-900'} text-4xl font-bold mb-2`}>
                {score}
              </div>
              <p className={isDarkMode ? 'text-white/70' : 'text-slate-700'}>Score</p>
            </div>
            <div className="flex justify-center gap-4">
              <Button onClick={() => setScore(0)}>New Game</Button>
              <Button variant="outline" onClick={() => setActiveGame(null)}>Back to Games</Button>
            </div>
          </Card>
        );

      default:
        return null;
    }
  };

  if (activeGame) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-6 pt-12 pb-32">
          {renderGame()}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-32">
        <div className="text-center mb-12">
          <h2 className={`${isDarkMode ? 'text-white/95' : 'text-slate-900'} font-serif text-4xl mb-4`}>
            Relaxation Games
          </h2>
          <p className={isDarkMode ? 'text-white/70' : 'text-slate-700'}>
            Calm your mind with interactive, peaceful activities
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <Card
              key={game.id}
              onClick={() => setActiveGame(game.id)}
              className={`${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-900/10'} backdrop-blur-xl p-6 hover-elevate active-elevate-2 cursor-pointer`}
              data-testid={`game-card-${game.id}`}
            >
              <div className={`w-full aspect-square rounded-lg bg-gradient-to-br ${game.color} flex items-center justify-center mb-4`}>
                <game.icon className={`w-16 h-16 ${isDarkMode ? 'text-white/80' : 'text-slate-800'}`} />
              </div>
              <h3 className={`${isDarkMode ? 'text-white/90' : 'text-slate-900'} text-xl mb-2 font-medium`}>
                {game.title}
              </h3>
              <p className={`${isDarkMode ? 'text-white/70' : 'text-slate-700'} mb-3 text-sm`}>
                {game.description}
              </p>
              <span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-slate-600'}`}>
                {game.duration}
              </span>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
