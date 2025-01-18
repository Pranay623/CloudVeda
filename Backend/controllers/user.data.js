import UserData from "../models/UserData.js";

async function saveUserData(req, res) {
  try {
    const {
      user_id,
      age,
      weight,
      height,
      mood,
      activity_level,
      dietary_habits,
      sleep_patterns,
      health_conditions,
      medications,
      stress_levels,
      hydration_levels,
      additional_details,
    } = req.body;

    // Validate user ID
    if (!user_id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Extract file URLs
    const images = req.files.images ? req.files.images.map(file => file.path) : [];
    const video = req.files.video ? req.files.video[0].path : null;

    // Create a new UserData document
    const userData = new UserData({
      user_id,
      age,
      weight,
      height,
      mood,
      activity_level,
      dietary_habits,
      sleep_patterns,
      health_conditions,
      medications,
      stress_levels,
      hydration_levels,
      additional_details: additional_details ? JSON.parse(additional_details) : {},
      images,
      video,
    });

    // Save to MongoDB
    const savedUserData = await userData.save();

    res.status(201).json({
      message: "User data saved successfully",
      data: savedUserData,
    });
  } catch (error) {
    res.status(500).json({
      error: `Error saving user data: ${error.message}`,
    });
  }
}

export default { saveUserData };
