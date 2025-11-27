import { Playlist } from '../models/Playlist';
import { Track } from '../models/Track';
import mongoose from 'mongoose';

export class PlaylistService {
  async getSystemPlaylists(): Promise<any[]> {
    return Playlist.find({ isSystemPlaylist: true, isActive: true })
      .populate('tracks')
      .sort({ trackCount: -1 });
  }

  async getTracks(): Promise<any[]> {
    return Track.find({ isActive: true }).sort({ playCount: -1 });
  }

  async incrementTrackPlayCount(trackId: string): Promise<void> {
    await Track.findByIdAndUpdate(trackId, { $inc: { playCount: 1 } });
  }

  async likeTrack(userId: string, trackId: string): Promise<any> {
    return Track.findByIdAndUpdate(
      trackId,
      { $addToSet: { likedBy: new mongoose.Types.ObjectId(userId) } },
      { new: true }
    );
  }

  async unlikeTrack(userId: string, trackId: string): Promise<any> {
    return Track.findByIdAndUpdate(
      trackId,
      { $pull: { likedBy: new mongoose.Types.ObjectId(userId) } },
      { new: true }
    );
  }
}

export const playlistService = new PlaylistService();
