import mongoose from "mongoose";

export interface IPet extends Document {
  name: string;
  age: number;
  weight: number;
  color: string;
  image?: string[];
  available: boolean;
  user: mongoose.Schema.Types.ObjectId;
  adopter?: mongoose.Schema.Types.ObjectId;
}

const Pet = mongoose.model('Pet', new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  images: {
    type: Array
  },
  available: {
    type: Boolean,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  adopter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
}));

export default Pet;