import User from '../models/User.js';

async function deductPoints(userId) {
    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new Error('User not found');
        }

        if (user.points < 10) {
            throw new Error('Insufficient points. Please purchase a package.');
        }

        user.points -= 10;
        await user.save();

        return { success: true, message: 'Points deducted successfully', remainingPoints: user.points };
    } catch (error) {
        throw new Error(error.message);
    }
}

export default deductPoints;