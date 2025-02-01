import User from "../models/User.js";
import bcrypt from "bcrypt";

async function createUser(userData) {
  try {
    const { name, email, password,role } = userData;

    console.log("Received userData:", userData);
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);

    if (!name || !email || !password) {
      throw new Error("All fields (name, email, password) are required");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email already in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = new User({
      userName: name,
      email,
      password: hashedPassword,
      roles:role,
    });

    const savedUser = await createdUser.save();

    const { password: _, ...userWithoutPassword } = savedUser.toObject();
    return userWithoutPassword;

  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
}

export default { createUser };