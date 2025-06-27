import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
  const { name, studentId, password } = req.body;
  try {
    const existingUser = await User.findOne({ studentId });
    if (existingUser)
      return res.status(400).json({ msg: "Student ID already registered" });

    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = new User({ name, studentId, password: hashedPass });
    await newUser.save();

    res.status(201).json({ msg: "Signup successful" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

const login = async (req, res) => {
  const { studentId, password } = req.body;
  try {
    const user = await User.findOne({ studentId });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, name: user.name, studentId: user.studentId },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({ token, name: user.name, studentId: user.studentId });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export { signup, login };
