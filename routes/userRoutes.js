const { addUser } = require("../controllers/userController");

const router = require("express").Router();

router.post("/", addUser);

module.exports = router;