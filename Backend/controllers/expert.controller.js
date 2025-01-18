import User from '../models/User.js';

async function getExperts(req, res) {
  try {
    // Find all users with the role of 'expert'
    const experts = await User.find({ roles: 'expert' });
    // Send the list of experts as the response
    res.status(200).json(experts);
  } catch (error) {
    res.status(500).json({ error: `Error retrieving experts: ${error.message}` });
  }
}

export default getExperts ;