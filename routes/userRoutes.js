const { addUser, updateScore } = require("../controllers/userController");

const router = require("express").Router();

router.post("/", addUser);
router.put("/score", updateScore);

module.exports = router;