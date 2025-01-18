import ImageData from "../models/ImageData.js";
import axios from "axios";

// Map ImageData fields to Ayurvedic indicators
const mapToAyurvedicPrinciples = (imageData) => {
  return {
    dosha_indicators: {
      skintone: imageData.skintone,
      expression: imageData.expression,
      skin_texture: imageData.skin_texture,
      dark_circles: imageData.dark_circles === "Yes" ? "Vata Imbalance" : "Balanced",
      spots: imageData.spots === "Yes" ? "Pitta Imbalance" : "Balanced",
      wrinkles: imageData.wrinkles === "Yes" ? "Vata Imbalance" : "Balanced",
      face_shape: imageData.face_shape,
      symmetry: imageData.symmetry === "Yes" ? "Balanced" : "Imbalanced",
    },
    overall_health: imageData.health_index,
  };
};

export const analyzeAyurvedicPrinciples = async (req, res) => {
    try {
      const { imageId } = req.params;
  
      // Fetch the image data
      const imageData = await ImageData.findById(imageId).populate("user_id");
      if (!imageData) {
        return res.status(404).json({ message: "Image data not found" });
      }
  
      // Map ImageData to Ayurvedic input
      const ayurvedicInput = mapToAyurvedicPrinciples(imageData);
  
      // Log the Ayurvedic input
      console.log('Ayurvedic Input:', ayurvedicInput);
  
      // Call the Gemini API
      const apiResponse = await axios.post("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCVG1vM6woBsg633nNKDVF7aHGyaIc8QtU", ayurvedicInput, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      // Log the API response
      console.log('API Response:', apiResponse.data);
  
      // Return the response
      res.status(200).json({
        message: "Ayurvedic analysis completed successfully",
        data: apiResponse.data,
      });
    } catch (error) {
      console.error("Error analyzing Ayurvedic principles:", error.message);
  
      // Log the error stack to help diagnose the issue
      console.error("Error stack:", error.stack);
  
      res.status(500).json({ message: "Failed to analyze Ayurvedic principles" });
    }
  };
  