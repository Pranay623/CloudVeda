import { textOnly } from "../utils/textOnly.js";  // Assuming textOnly handles plain text generation
import ImageData from "../models/ImageData.js";

export const aiController = async (req, res) => {
  const { modelType, imageId, prompt } = req.body; // Assuming prompt is passed with the request

  if (modelType === "text_only") {
    // Fetch image data for Ayurvedic input
    const imageData = await ImageData.findById(imageId).populate("user_id");
    console.log(imageData);

    if (!imageData) {
      return res.status(404).json({ message: "Image data not found" });
    }

    // Map ImageData to Ayurvedic input
    const ayurvedicInput = {
      skinTone: imageData.skintone,
      skinExpression: imageData.expression,
      skinTexture: imageData.skin_texture,
      darkCircles: imageData.dark_circles,
      spots: imageData.spots,
      wrinkles: imageData.wrinkles,
      faceShape: imageData.face_shape,
      symmetry: imageData.symmetry,
      healthStatus: imageData.overall_health,
    };

    // Send the Ayurvedic input as the prompt
    const botReply = await textOnly(ayurvedicInput);

    if (botReply?.Error) {
      return res.status(404).json({ Error: botReply.Error });
    }

    res.status(200).json({ result: botReply.result });

  } else {
    res.status(404).json({ result: "Invalid Model Selected" });
  }
};
