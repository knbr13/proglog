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
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateScore = async (req, res) => {
  const { email, flipsScore, timeScore } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "No such user" });
    await User.updateOne(
      { email },
      {
        flipsScore: Math.min(parseInt(flipsScore), user.flipsScore || 9999),
        timeScore: Math.min(parseInt(timeScore), user.timeScore || 9999999),
      },
      { new: true }
    );
    const updatedUserInfo = await User.findOne({ email });
    res.status(200).json(updatedUserInfo);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUsersWithHighestScores = async (req, res) => {
  const { limit = 5, pageNumber = 1, scoreField = "flipsScore" } = req.query;
  const skip = (pageNumber - 1) * limit;

  if (scoreField !== "flipsScore" && scoreField !== "timeScore")
    return res.status(400).json({ error: "invalid score field" });

  try {
    const sortOption = {};
    const query = {
      [scoreField]: { $exists: true },
    };

    if (scoreField === "flipsScore") {
      sortOption.flipsScore = 1;
      sortOption.timeScore = 1;
    } else if (scoreField === "timeScore") {
      sortOption.timeScore = 1;
      sortOption.flipsScore = 1;
    }

    const users = await User.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    const totalUsers = await User.countDocuments(query);
    const totalPages = Math.ceil(totalUsers / limit);

    res.status(200).json({ users, totalPages });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUserRank = async (req, res) => {
  const { email } = req.query;
  if (!email)
    return res.status(400).json({ error: "Missing some requierd data!" });
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "No such user" });
    const higherRankCount = await User.countDocuments({
      flipsScore: { $gt: user.flipsScore },
    });
    const userRank = higherRankCount + 1;
    res.status(200).json({ rank: userRank });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addUser,
  updateScore,
  getUsersWithHighestScores,
  getUserRank,
};
