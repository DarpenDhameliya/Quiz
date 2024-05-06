const express = require("express");

const Authenticate = require("../middleware/authMiddleware");
const { upload } = require("../middleware/imageMiddleware");
const {
  getAllQuizAttemptData,
  postAddQuizAttempt,
} = require("../controllers/quizAttemptController");

const router = express.Router();
router.get("/list", getAllQuizAttemptData);
router.post("/addattempt", Authenticate, postAddQuizAttempt);

module.exports = router;
