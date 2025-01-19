import ImageData from '../models/ImageData.js';
import HealthAnalysis from '../models/response.js';

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

export const mlresponse = async (req, res) => {
  try {
    // Extract data from the request body
    const {
      user_id,
      expert_id,
      hair_analysis,
      hairline_analysis,
      skin_analysis, // This should be an object now
      nail_analysis
    } = req.body;

    // Create a new document based on the extracted data
    const newHealthAnalysis = new HealthAnalysis({
      user_id, // Pass the user ID from req.body
      expert_id,
      hair_analysis,
      hairline_analysis,
      skin_analysis, // Directly pass the whole object
      nail_analysis,
    });

    // Save the new document to the database
    await newHealthAnalysis.save();

    // Send a success response
    res.status(201).json({
      message: 'Health analysis data saved successfully',
      data: newHealthAnalysis
    });
  } catch (error) {
    console.error('Error saving health analysis data:', error);
    res.status(500).json({ message: 'Error saving data', error: error.message });
  }
};

export const getHealthAnalysis = async (req, res) => {
  try {
    // Extract user ID or any query parameters as needed (e.g., get by user ID or other filters)
    const { user_id } = req.query;  // Assuming user_id is passed as a query parameter

    // Fetch the health analysis data from the database
    const healthData = await HealthAnalysis.findOne({ user_id }); // You may need to add user_id to your schema if it's not there

    if (!healthData) {
      return res.status(404).json({ message: 'No health analysis data found for this user' });
    }

    // Send a success response with the health analysis data
    res.status(200).json({
      message: 'Health analysis data retrieved successfully',
      data: healthData,
    });
  } catch (error) {
    console.error('Error retrieving health analysis data:', error);
    res.status(500).json({ message: 'Error retrieving data', error: error.message });
  }
};
