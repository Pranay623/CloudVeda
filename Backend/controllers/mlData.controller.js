import ImageData from '../models/ImageData.js';

export const saveImageData = async (req, res) => {
  try {
    const {
      user_id,
      skintone,
      expression,
      skin_texture,
      dark_circles,
      spots,
      wrinkles,
      face_shape,
      symmetry,
      health_index,
    } = req.body;

    // Validate user_id
    if (!user_id) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Create a new ImageData document
    const imageData = new ImageData({
      user_id,
      skintone,
      expression,
      skin_texture,
      dark_circles,
      spots,
      wrinkles,
      face_shape,
      symmetry,
      health_index,
    });

    // Save to MongoDB
    const savedImageData = await imageData.save();

    res.status(201).json({
      message: 'Image data saved successfully',
      data: savedImageData,
    });
  } catch (error) {
    res.status(500).json({
      error: `Error saving image data: ${error.message}`,
    });
  }
};