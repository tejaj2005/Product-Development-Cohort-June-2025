import mongoose from "mongoose";

const courtSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true, // e.g., "basketball", "badminton"
  },
  location: {
    type: String,
    required: true,
  },
  is_available: {
    type: Boolean,
    default: true,
  },
  open_time: {
    type: String, // Can use "HH:MM" format
  },
  close_time: {
    type: String,
  },
  added_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Court = mongoose.model("Court", courtSchema);

export default Court;
