import mongoose, { Document, Schema } from 'mongoose';

export interface IPlaylist extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  category: 'healing-frequencies' | 'binaural-beats' | 'nature-sounds' | 'ambient' | 'meditation' | 'sleep' | 'custom';
  tracks: mongoose.Types.ObjectId[];
  trackCount: number;
  totalDuration: number;
  creatorId?: mongoose.Types.ObjectId;
  isSystemPlaylist: boolean;
  coverImage?: string;
  playCount: number;
  likedBy: mongoose.Types.ObjectId[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const playlistSchema = new Schema<IPlaylist>({
  title: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 150
  },
  description: { 
    type: String,
    trim: true,
    maxlength: 500,
    default: ''
  },
  category: { 
    type: String,
    enum: ['healing-frequencies', 'binaural-beats', 'nature-sounds', 'ambient', 'meditation', 'sleep', 'custom'],
    required: true
  },
  tracks: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Track' 
  }],
  trackCount: { 
    type: Number, 
    default: 0 
  },
  totalDuration: { 
    type: Number, 
    default: 0 
  },
  creatorId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User',
    default: null
  },
  isSystemPlaylist: { 
    type: Boolean, 
    default: false 
  },
  coverImage: { 
    type: String,
    default: null
  },
  playCount: { 
    type: Number, 
    default: 0 
  },
  likedBy: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  isActive: { 
    type: Boolean, 
    default: true 
  }
}, {
  timestamps: true
});

playlistSchema.index({ category: 1, isSystemPlaylist: 1 });
playlistSchema.index({ isActive: 1, playCount: -1 });

export const Playlist = mongoose.model<IPlaylist>('Playlist', playlistSchema);
