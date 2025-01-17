import authService from '../utils/login.js';
import userService from '../utils/signup.js';

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const token = await authService.login(email, password);
        res.status(200).json({ token });
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