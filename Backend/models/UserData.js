import mongoose from "mongoose";

const UserDataSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required: true,
  },
  expert_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  age: {
    type: Number,
    // required: true,
  },
  weight: {
    type: Number,
    // required: true,
  },
  height: {
    type: Number,
    // required: true,
  },
  mood: {
    type: String,
    enum: ["Happy", "Neutral", "Stressed", "Sad", "Anxious", "Calm"],
    // required: true,
  },
  activity_level: {
    type: String,
    enum: [
      "Sedentary",
      "Lightly active",
      "Moderately active",
      "Very active",
      "Super active",
    ],
    required: true,
  },
  dietary_habits: {
    type: String,
    enum: [
      "Vegetarian",
      "Vegan",
      "Non-vegetarian",
      "Keto",
      "Balanced diet",
      "High-carb, low-protein",
    ],
    // required: true,
  },
  sleep_patterns: {
    type: String,
    enum: ["Less than 5 hours", "5-6 hours", "7-8 hours", "8+ hours"],
    // required: true,
  },
  health_conditions: {
    type: [String],
    enum: [
      "None",
      "Hypertension",
      "Diabetes",
      "Asthma",
      "Heart disease",
      "Arthritis",
      "Anxiety/Depression",
    ],
    // required: true,
  },
  medications: {
    type: [String],
    enum: [
      "None",
      "Prescribed for chronic conditions",
      "Over-the-counter supplements",
      "Birth control",
      "Pain relief",
    ],
    // required: true,
  },
  stress_levels: {
    type: String,
    enum: ["Very low", "Low", "Moderate", "High", "Very high"],
    // required: true,
  },
  hydration_levels: {
    type: String,
    enum: ["Very low", "Low", "Adequate", "High"],
    // required: true,
  },
  additional_details: { type: Object },
  created_at: { type: Date, default: Date.now },
  status: { type: String, default: "Pending" },

  skintone: {
    type: String,
    enum: ['Fair', 'Medium', 'Olive', 'Dark'],
},
expression:{
    type: String,
    enum: ['Happy', 'Neutral', 'Stressed', 'Sad', 'Anxious', 'Calm'],
},
skin_texture:{
    type: String,
    enum: ['Dry', 'Oily', 'Combination', 'Normal'],
},
dark_circles:{
    type: String,
    enum: ['Yes', 'No'],
},
spots:{
    type: String,
    enum: ['Yes', 'No'],
},
wrinkles:{
    type: String,
    enum: ['Yes', 'No'],
},
face_shape:{
    type: String,
    enum: ['Round', 'Oval', 'Square', 'Heart', 'Diamond'],
},
symmetry:{
    type: String,
    enum: ['Yes', 'No'],
},
health_index:{
    type: String,
    enum: ['Good', 'Average', 'Poor'],
},
  

});

const UserData = mongoose.model("UserData", UserDataSchema);

export default UserData;