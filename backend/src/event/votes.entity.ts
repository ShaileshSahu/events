import mongoose from 'mongoose';

const VotesSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  name:{
    type: String,
  },
  date:{
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now    // Default to current date/time
  }
});

export const Vote = mongoose.model('Vote', VotesSchema);
