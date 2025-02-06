import User from "../model/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const LoginUser = async (req, res) => {
  const { email, password } = req.body;

  // console.log(email, password);

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT Token
    const payload = {
      userId: user._id,
      name: user.name,
    };

    const token = jwt.sign(payload, "your_jwt_secret", { expiresIn: "1h" });

    // Return token and user data
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const RegisterUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check for existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({ name, email, password: hashedPassword });

    // Generate JWT Token
    const payload = {
      userId: user._id,
      name: user.name,
    };

    const token = jwt.sign(payload, "your_jwt_secret", { expiresIn: "1h" });

    // Return token and user data

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

export { LoginUser, RegisterUser };
