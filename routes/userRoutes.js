const {
  addUser,
  updateScore,
  getUsersWithHighestScores,
  getUserRank,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/", addUser);
router.put("/score", updateScore);
router.get("/", getUsersWithHighestScores);
router.get("/rank", getUserRank);

module.exports = router;
