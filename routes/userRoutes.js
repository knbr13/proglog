const {
  addUser,
  updateScore,
  getUsersWithHighestScores,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/", addUser);
router.put("/score", updateScore);
router.get("/", getUsersWithHighestScores);

module.exports = router;
