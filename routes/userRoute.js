const express = require("express");
const tokenMiddleware = require("../middleware/authMiddleware");
const { listUsers, userDetail } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.get('/',tokenMiddleware,listUsers);

userRouter.get('/:userId',tokenMiddleware,userDetail);

module.exports = userRouter;