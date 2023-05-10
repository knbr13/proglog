const User = require("../models/userModel");

const addUser = async (req, res) => {
  const { name, picture, email } = req.body;
  if (!name || !picture || !email)
    return res.status(400).json({ error: "Missing some requierd data!" });
  try {
    const userExist = await User.findOne({ email });
    if (userExist) return res.status(200).json(userExist);
    const user = await User.create({ name, email, picture });
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateScore = async (req, res) => {
  const { email, flipsScore, timeScore } = req.body;
  try {
    const user = await User.find({ email });
    if (!user) return res.status(404).json({ error: "No such user" });
    await User.updateOne({
      flipsScore: Math.min(flipsScore, user.flipsScore),
      timeScore: Math.min(timeScore, user.timeScore),
    });
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUsersWithHighestScores = async () => {
  const { limit = 5, pageNumber = 1 } = req.body;
  const skip = (pageNumber - 1) * limit;

  try {
    const users = await User.find()
      .sort({ flipsScore: 1 })
      .skip(skip)
      .limit(limit);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addUser, updateScore, getUsersWithHighestScores };
