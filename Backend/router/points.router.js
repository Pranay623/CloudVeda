import express from 'express';
import deductPoints from '../controllers/points.controller.js';

const router = express.Router();

// Deduct points route
router.post('/deduct-points', async (req, res) => {
    const { userId } = req.body;

    try {
        const result = await deductPoints(userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
