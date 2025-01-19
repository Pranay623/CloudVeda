import HealthAnalysis from '../models/response.js';
import UserData from '../models/UserData.js';

// Get all documents by expert_id
const getImageDataByExpertId = async (req, res) => {
  const { expert_id } = req.body; // Assuming expert_id is passed as a query parameter.

  if (!expert_id) {
    return res.status(400).json({ error: 'expert_id is required' });
  }

  try {
    // Fetch image data matching the expert_id
    const imageData = await HealthAnalysis.find({ expert_id }).populate('user_id expert_id');
    const userData = await UserData.find({ expert_id }).populate('user_id expert_id');

    if (!userData.length) {
      return res.status(404).json({ message: 'No image data found for the given expert_id' });
    }

    res.status(200).json({imageData, userData});
  } catch (error) {
    console.error('Error fetching image data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default getImageDataByExpertId;
