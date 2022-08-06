import { body } from "express-validator";

export const registerValidation = [
  body('email', 'Email is not correct').isEmail(),
  body('password', 'The password should be equal min 3').isLength({ min: 3}),
  body('fullName', 'Write your name').isLength( { min: 3}),
  body('avatarUrl', 'The link is not correct').optional().isURL(),
];
