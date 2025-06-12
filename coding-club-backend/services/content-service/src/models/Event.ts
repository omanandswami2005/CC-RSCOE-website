import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  date: Date;
  description: string;
  content?: string;
  images: {
    url: string;
    publicId: string;
    caption?: string;
  }[];
  category: 'workshop' | 'hackathon' | 'seminar' | 'competition' | 'other';
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  location?: string;
  registrationLink?: string;
  maxParticipants?: number;
  currentParticipants: number;
  tags: string[];
  organizers: mongoose.Types.ObjectId[];
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema: Schema = new Schema({
  title: { type: String, required: true, trim: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  content: { type: String },
  images: [{
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    caption: { type: String }
  }],
  category: { 
    type: String, 
    enum: ['workshop', 'hackathon', 'seminar', 'competition', 'other'],
    default: 'other'
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  location: { type: String },
  registrationLink: { type: String },
  maxParticipants: { type: Number },
  currentParticipants: { type: Number, default: 0 },
  tags: [{ type: String }],
  organizers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

EventSchema.virtual('isUpcoming').get(function() {
  return this.date > new Date() && this.status === 'upcoming';
});

EventSchema.virtual('isPast').get(function() {
  return this.date < new Date() || this.status === 'completed';
});

export const Event = mongoose.model<IEvent>('Event', EventSchema);