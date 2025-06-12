import mongoose, { Document, Schema } from 'mongoose';

export interface IAchievement extends Document {
  title: string;
  description: string;
  date: Date;
  category: 'competition' | 'project' | 'recognition' | 'milestone';
  images: {
    url: string;
    publicId: string;
    caption?: string;
  }[];
  participants: {
    name: string;
    role: string;
    userId?: mongoose.Types.ObjectId;
  }[];
  isHighlighted: boolean;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const AchievementSchema: Schema = new Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  category: {
    type: String,
    enum: ['competition', 'project', 'recognition', 'milestone'],
    required: true
  },
  images: [{
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    caption: { type: String }
  }],
  participants: [{
    name: { type: String, required: true },
    role: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User' }
  }],
  isHighlighted: { type: Boolean, default: false },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export const Achievement = mongoose.model<IAchievement>('Achievement', AchievementSchema);