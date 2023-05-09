const User = require("../models/userModel");

const addUser = async (req, res) => {
  const { name, picture, email } = req.body;
  if (!name || !picture || !email)
    return res.status(400).json({ error: "Missing some requierd data!" });
  try {
    const user = await User.create({ name, email, picture });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addUser };