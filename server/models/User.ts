import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  fullName: string;
  avatar?: string;
  phone?: string;
  city?: string;
  bio?: string;
  voiceEnabled: boolean;
  notificationsEnabled: boolean;
  emergencyContacts: {
    name: string;
    phone: string;
    relationship: string;
  }[];
  blockedUsers: mongoose.Types.ObjectId[];
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  username: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true,
    trim: true
  },
  password: { 
    type: String, 
    required: true,
    minlength: 8
  },
  fullName: { 
    type: String, 
    required: true,
    trim: true
  },
  avatar: { 
    type: String,
    default: null
  },
  phone: { 
    type: String,
    default: null
  },
  city: { 
    type: String,
    default: null
  },
  bio: { 
    type: String,
    maxlength: 500,
    default: null
  },
  voiceEnabled: { 
    type: Boolean, 
    default: true 
  },
  notificationsEnabled: { 
    type: Boolean, 
    default: true 
  },
  emergencyContacts: [{
    name: { type: String, required: true },
    phone: { type: String, required: true },
    relationship: { type: String, required: true }
  }],
  blockedUsers: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  refreshToken: { 
    type: String,
    default: null
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Indexes
try {
  userSchema.index({ email: 1 });
  userSchema.index({ username: 1 });
} catch (e) {
  // Index creation errors are non-critical
}

export const User = mongoose.model<IUser>('User', userSchema);
