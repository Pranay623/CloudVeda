import User from '../models/User.js';

async function getExperts(req, res) {
  try {
    const experts = await User.find({ roles: 'expert' });
    res.status(200).json(experts);
  } catch (error) {
    res.status(500).json({ error: `Error retrieving experts: ${error.message}` });
  }
}

export default getExperts ;