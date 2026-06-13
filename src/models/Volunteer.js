import mongoose from "mongoose";

const VolunteerSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    age: Number,
    city: String,
    skills: [String],
    availability: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Volunteer ||
  mongoose.model("Volunteer", VolunteerSchema);
