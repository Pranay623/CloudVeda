import axios from "axios";
import { aiConfig } from "../config/ai.config.js";

export const textOnly = async (input) => {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${aiConfig.gemini.textOnlyModel}:generateContent`,
      {
        prompt: input, 
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${aiConfig.gemini.apiKey}`,
        },
      }
    );
    return { result: response.data };
  } catch (error) {
    console.error("Error generating response for textOnly:", error.message);
    return { Error: error.message };
  }
};
