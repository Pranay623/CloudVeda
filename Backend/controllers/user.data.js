import UserData from "../models/UserData.js";
import cookieParser from "cookie-parser";
import 'dotenv/config';

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
      expert_id,
    } = req.body;

    if (!user_id) {
      return res.status(400).json({ error: "User ID is required" });
    }

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
      expert_id,
    });
    

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

async function getUserData(req, res) {
  try {
    const { user_id } = req.params;

    const userData = await UserData.findOne({ user_id });
    res.status(200).json({
      data: userData,
    });
}catch(error){
    res.status(500).json({
      error: `Error fetching user data: ${error.message}`,
    });
  }
}

export default { 
    saveUserData,
    getUserData 
};
