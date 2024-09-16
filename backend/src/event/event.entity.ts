import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    unique: true
  },
  dates: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


export const Event = mongoose.model('User', EventSchema);
