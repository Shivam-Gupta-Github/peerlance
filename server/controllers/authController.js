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

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, name: newUser.name, studentId: newUser.studentId },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Send token and user info
    res.status(201).json({
      token,
      name: newUser.name,
      studentId: newUser.studentId,
    });
  } catch (err) {
    console.error("Signup error:", err);
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

const update = async (req, res) => {
  const { name, studentId, password } = req.body;

  const update = {};
  if (name) update.name = name;
  if (studentId) update.studentId = studentId;
  if (password) update.password = await bcrypt.hash(password, 10);

  const user = await User.findByIdAndUpdate(req.user, update, { new: true });
  res.json({ message: "Updated successfully", user });
};

export { signup, login, update };
