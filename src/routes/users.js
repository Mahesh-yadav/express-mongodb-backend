import express from 'express';
import UserControllers from '../controllers/users';
import { body } from 'express-validator';
import { requireSignin, hasAuthorization } from '../controllers/auth';

const userRouter = express.Router();

userRouter.post(
  '/',
  [
    body('name')
      .not()
      .isEmpty()
      .withMessage('Name is required')
      .isLength({ min: 6 })
      .withMessage('Name should contain atleast 6 letters')
      .matches(/^[a-zA-Z ]+$/)
      .withMessage('Name can only contain letters'),
    body('email')
      .not()
      .isEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Email is invalid')
      .normalizeEmail(),
    body('password')
      .not()
      .isEmpty()
      .withMessage('Password is required')
      .isLength({ min: 3 })
      .withMessage('Password should be atleast 3 characters long'),
  ],
  UserControllers.createUser
);

userRouter.get('/', UserControllers.listUsers);

userRouter.get(
  '/:userId',
  requireSignin,
  hasAuthorization,
  UserControllers.getUser
);

userRouter.put(
  '/:userId',
  requireSignin,
  hasAuthorization,
  [
    body('name')
      .not()
      .isEmpty()
      .withMessage('Name is required')
      .isLength({ min: 6 })
      .withMessage('Name should contain atleast 6 letters')
      .matches(/^[a-zA-Z ]+$/)
      .withMessage('Name can only contain letters'),
    body('password')
      .not()
      .isEmpty()
      .withMessage('Password is required')
      .isLength({ min: 3 })
      .withMessage('Password should be atleast 3 characters long'),
  ],
  UserControllers.updateUser
);

userRouter.delete(
  '/:userId',
  requireSignin,
  hasAuthorization,
  UserControllers.deleteUser
);

export default userRouter;
