import authService from '../utils/login.js';
import userService from '../utils/signup.js';
import User from '../models/User.js';

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const token = await authService.login(email, password);
        const user = await User.findOne({ email: email });
        res.status(200).json({
            token: token,
            user_id: user._id,
            name: user.userName,
            email: user.email,
            role: user.roles,
            points: user.points,
            status: user.status,
            message: "Login successful",
          });
          
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: error.message });
    }
}


async function createUser(req, res) {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json({ user, message: "User created successfully" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}
export { login, createUser };