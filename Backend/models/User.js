import User from "../models/User.js";
import bcrypt from "bcrypt";

async function createUser(userData) {
  try {
    const { name, email, password } = userData;

    // Log the userData to debug
    console.log("Received userData:", userData);
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);

    // Validate inputs
    if (!name || !email || !password) {
      throw new Error("All fields (name, email, password) are required");
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email already in use");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // Ensure password is defined

    // Create a new user
    const createdUser = new User({
      userName: name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = await createdUser.save();

    // Return the saved user without the password
    const { password: _, ...userWithoutPassword } = savedUser.toObject();
    return userWithoutPassword;

  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
}

export default { createUser };