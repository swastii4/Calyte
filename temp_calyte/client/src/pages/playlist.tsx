import { Layout } from '@/components/Layout';
import { useTheme } from '@/contexts/ThemeContext';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, SkipForward, SkipBack, Volume2, Heart, Music as MusicIcon, Clock } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';

export default function Playlist() {
  const { isDarkMode } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([70]);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(23);
  const [likedTracks, setLikedTracks] = useState<number[]>([0, 2]);

  const playlists = [
    {
      id: 1,
      title: 'Deep Sleep Sounds',
      description: 'Peaceful ambient sounds for restful sleep',
      trackCount: 12,
      duration: 360,
      category: 'Sleep',
    },
    {
      id: 2,
      title: 'Focus & Concentration',
      description: 'Instrumental music to enhance productivity',
      trackCount: 15,
      duration: 420,
      category: 'Focus',
    },
    {
      id: 3,
      title: 'Meditation Essentials',
      description: 'Calming tracks for meditation practice',
      trackCount: 18,
      duration: 540,
      category: 'Meditation',
    },
    {
      id: 4,
      title: 'Nature Soundscapes',
      description: 'Immerse yourself in natural environments',
      trackCount: 10,
      duration: 300,
      category: 'Nature',
    },
  ];

  const tracks = [
    { title: 'Calm Meditation of Love 528 Hz', artist: 'Healing Frequencies', duration: '8:30', src: '@assets/60423014_calm-meditation-of-love-528-hz_1763903818821.mp3' },
    { title: '639/528/432Hz Attract Love', artist: 'Deep Feeling', duration: '10:15', src: '@assets/639528432hz-attract-love-deep-feeling-300658_1763903858506.mp3' },
    { title: 'Angels Lullaby 528 Hz', artist: 'Peaceful Sleep', duration: '12:00', src: '@assets/angels-lullaby-528-hz-short-391382_1763903867831.mp3' },
    { title: 'Meditation Binaural 8 Hz', artist: 'Theta Waves', duration: '7:45', src: '@assets/meditation-binaural-8-hz-short-396646_1763903879470.mp3' },
    { title: 'Meditation Music 528 Hz', artist: 'Healing Tones', duration: '9:20', src: '@assets/meditation-music-528-hz-short-pixabay-379018_1763903888408.mp3' },
    { title: 'Meditation Sleep 528Hz/396Hz', artist: 'Deep Relaxation', duration: '11:30', src: '@assets/meditation-sleep-528hz-396hz-short-394088_1763903896487.mp3' },
    { title: 'Pure Theta 4-7Hz', artist: 'Ambient Music', duration: '8:15', src: '@assets/pure-theta-4-7hz-with-ambient-music-351341_1763903906303.mp3' },
    { title: 'Replenish 432 Hz', artist: 'Liborio Conti', duration: '9:45', src: '@assets/Relaxing-Music-432-Hz-Free-No-Copyright-Music-by-Liborio-Conti-01-REPLENISH_1763903917543.mp3' },
    { title: 'Timing 432 Hz', artist: 'Liborio Conti', duration: '8:50', src: '@assets/Relaxing-Music-432-Hz-Free-No-Copyright-Music-by-Liborio-Conti-08-TIMING_1763903925675.mp3' },
    { title: 'Sanctuary 432 Hz', artist: 'Liborio Conti', duration: '10:20', src: '@assets/Relaxing-Music-432-Hz-Free-No-Copyright-Music-by-Liborio-Conti-16-SANCTUARY_1763903934009.mp3' },
    { title: 'Motion 432 Hz', artist: 'Liborio Conti', duration: '9:30', src: '@assets/Relaxing-Music-432-Hz-Free-No-Copyright-Music-by-Liborio-Conti-24-MOTION_1763903942369.mp3' },
    { title: 'Floating 432 Hz', artist: 'Liborio Conti', duration: '11:00', src: '@assets/Relaxing-Music-432-Hz-Free-No-Copyright-Music-by-Liborio-Conti-32-FLOATING_1763903950471.mp3' },
    { title: 'Earth 432 Hz', artist: 'Liborio Conti', duration: '10:45', src: '@assets/Relaxing-Music-432-Hz-Free-No-Copyright-Music-by-Liborio-Conti-40-EARTH_1763903958812.mp3' },
    { title: 'Blossom 432 Hz', artist: 'Liborio Conti', duration: '9:15', src: '@assets/Relaxing-Music-432-Hz-Free-No-Copyright-Music-by-Liborio-Conti-47-BLOSSOM_1763903971175.mp3' },
    { title: 'Tuning 432 Hz', artist: 'Liborio Conti', duration: '8:40', src: '@assets/Relaxing-Music-432-Hz-Free-No-Copyright-Music-by-Liborio-Conti-63-TUNING_1763903983089.mp3' },
    { title: 'The Deep 432 Hz', artist: 'Liborio Conti', duration: '12:15', src: '@assets/Relaxing-Music-432-Hz-Free-No-Copyright-Music-by-Liborio-Conti-71-THE-DEEP_1763903993763.mp3' },
    { title: 'Movement 432 Hz', artist: 'Liborio Conti', duration: '10:10', src: '@assets/Relaxing-Music-432-Hz-Free-No-Copyright-Music-by-Liborio-Conti-79-MOVEMENT_1763904003370.mp3' },
    { title: '528 Hz Strings Texture', artist: 'Frequency Healing', duration: '9:00', src: '@assets/528-hz-strings-texture-_1763903733990.mp3' },
    { title: 'Sleep Music Beta 14-30 Hz', artist: 'Binaural Beats', duration: '13:20', src: '@assets/sleep-music-beta-range-14-hz-30-hz-binaural-immersive-audio-426675_1763904011204.mp3' },
  ];

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const handleLike = (index: number) => {
    if (likedTracks.includes(index)) {
      setLikedTracks(likedTracks.filter(i => i !== index));
    } else {
      setLikedTracks([...likedTracks, index]);
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-32">
        <div className="mb-8">
          <h2 className={`${isDarkMode ? 'text-white/95' : 'text-slate-900'} font-serif text-4xl mb-2`}>
            Calming Music
          </h2>
          <p className={isDarkMode ? 'text-white/70' : 'text-slate-700'}>
            Curated playlists for meditation, focus, and relaxation
          </p>
        </div>

        <Card className={`${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-slate-900/5 border-slate-900/10'} backdrop-blur-xl p-6 mb-8`}>
          <div className="flex flex-col md:flex-row gap-6">
            <div className={`w-full md:w-48 h-48 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-gradient-to-br from-purple-500/30 to-pink-500/30' : 'bg-gradient-to-br from-blue-500/30 to-purple-500/30'}`}>
              <MusicIcon className={`w-20 h-20 ${isDarkMode ? 'text-white/90' : 'text-slate-900/90'}`} />
            </div>

            <div className="flex-1">
              <Badge variant="outline" className="mb-2">Now Playing</Badge>
              <h3 className={`${isDarkMode ? 'text-white/95' : 'text-slate-900'} text-2xl font-medium mb-2`} data-testid="text-current-track">
                {tracks[currentTrack].title}
              </h3>
              <p className={`${isDarkMode ? 'text-white/70' : 'text-slate-700'} mb-6`}>
                {tracks[currentTrack].artist}
              </p>

              <div className="mb-6">
                <Progress value={progress} className="h-2 mb-2" />
                <div className="flex justify-between text-sm">
                  <span className={isDarkMode ? 'text-white/60' : 'text-slate-600'}>2:34</span>
                  <span className={isDarkMode ? 'text-white/60' : 'text-slate-600'}>{tracks[currentTrack].duration}</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 mb-6">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCurrentTrack(Math.max(0, currentTrack - 1))}
                  disabled={currentTrack === 0}
                  data-testid="button-previous"
                >
                  <SkipBack className="w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  className="rounded-full w-14 h-14"
                  onClick={() => setIsPlaying(!isPlaying)}
                  data-testid="button-play-pause"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCurrentTrack(Math.min(tracks.length - 1, currentTrack + 1))}
                  disabled={currentTrack === tracks.length - 1}
                  data-testid="button-next"
                >
                  <SkipForward className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleLike(currentTrack)}
                  className={likedTracks.includes(currentTrack) ? 'text-pink-400' : ''}
                  data-testid="button-like"
                >
                  <Heart className={`w-5 h-5 ${likedTracks.includes(currentTrack) ? 'fill-current' : ''}`} />
                </Button>
                <Volume2 className={`w-5 h-5 ${isDarkMode ? 'text-white/60' : 'text-slate-600'}`} />
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  max={100}
                  step={1}
                  className="w-32"
                  data-testid="slider-volume"
                />
                <span className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-slate-600'} w-10`}>
                  {volume[0]}%
                </span>
              </div>
            </div>
          </div>
        </Card>

        <h3 className={`${isDarkMode ? 'text-white/90' : 'text-slate-900'} font-serif text-2xl mb-6`}>Playlists</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {playlists.map((playlist) => (
            <Card key={playlist.id} className={`${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-slate-900/5 border-slate-900/10'} backdrop-blur-xl p-6 hover-elevate active-elevate-2 cursor-pointer`}>
              <div className={`w-full aspect-square rounded-lg flex items-center justify-center mb-4 ${
                isDarkMode ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20' : 'bg-gradient-to-br from-blue-500/20 to-purple-500/20'
              }`}>
                <MusicIcon className={`w-12 h-12 ${isDarkMode ? 'text-white/60' : 'text-slate-600'}`} />
              </div>
              <Badge variant="outline" className="text-xs mb-2">{playlist.category}</Badge>
              <h4 className={`${isDarkMode ? 'text-white/90' : 'text-slate-900'} font-medium mb-2`}>
                {playlist.title}
              </h4>
              <p className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-slate-700'} mb-4`}>
                {playlist.description}
              </p>
              <div className="flex items-center gap-4 text-xs">
                <span className={isDarkMode ? 'text-white/60' : 'text-slate-600'}>
                  {playlist.trackCount} tracks
                </span>
                <span className={isDarkMode ? 'text-white/60' : 'text-slate-600'}>•</span>
                <span className={isDarkMode ? 'text-white/60' : 'text-slate-600'}>
                  {formatDuration(playlist.duration)}
                </span>
              </div>
            </Card>
          ))}
        </div>

        <h3 className={`${isDarkMode ? 'text-white/90' : 'text-slate-900'} font-serif text-2xl mb-6`}>All Tracks</h3>
        <Card className={`${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-slate-900/5 border-slate-900/10'} backdrop-blur-xl overflow-hidden`}>
          {tracks.map((track, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 p-4 transition-all hover-elevate cursor-pointer ${
                currentTrack === index ? isDarkMode ? 'bg-white/10' : 'bg-slate-900/10' : ''
              } ${index !== tracks.length - 1 ? isDarkMode ? 'border-b border-white/10' : 'border-b border-slate-900/10' : ''}`}
              onClick={() => setCurrentTrack(index)}
              data-testid={`track-${index}`}
            >
              <Button
                variant="ghost"
                size="icon"
                className="flex-shrink-0"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentTrack(index);
                  setIsPlaying(!isPlaying);
                }}
              >
                {currentTrack === index && isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </Button>

              <div className="flex-1 min-w-0">
                <h4 className={`${isDarkMode ? 'text-white/90' : 'text-slate-900'} font-medium truncate`}>
                  {track.title}
                </h4>
                <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-slate-600'} truncate`}>
                  {track.artist}
                </p>
              </div>

              <div className="flex items-center gap-4 flex-shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike(index);
                  }}
                  className={likedTracks.includes(index) ? 'text-pink-400' : ''}
                >
                  <Heart className={`w-4 h-4 ${likedTracks.includes(index) ? 'fill-current' : ''}`} />
                </Button>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className={`w-4 h-4 ${isDarkMode ? 'text-white/60' : 'text-slate-600'}`} />
                  <span className={isDarkMode ? 'text-white/70' : 'text-slate-700'}>{track.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </Layout>
  );
}
