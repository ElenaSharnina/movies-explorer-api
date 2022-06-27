const userRouter = require('express').Router();
const bodyParser = require('body-parser');
const {
  getUserInfo, updateUserInfo,
} = require('../controllers/users');
const { validationUserUpdate } = require('../validator/validator');

userRouter.use(bodyParser.json());
userRouter.use(bodyParser.urlencoded({ extended: true }));

userRouter.get('/me', getUserInfo);

userRouter.patch('/me', validationUserUpdate, updateUserInfo);

module.exports = userRouter;
