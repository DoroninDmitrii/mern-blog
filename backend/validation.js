import { body } from "express-validator";

export const loginValidation = [
  body('email', 'Email is not correct').isEmail(),
  body('password', 'The password should be equal min 3').isLength({ min: 3}),
];

export const registerValidation = [
  body('email', 'Email is not correct').isEmail(),
  body('password', 'The password should be equal min 3').isLength({ min: 3}),
  body('fullName', 'Write your name').isLength( { min: 3}),
  body('avatarUrl', 'The link is not correct').optional().isURL(),
];

export const postCreateValidation = [
  body('title', 'Write your article is title').isLength({ min: 3}).isString(),
  body('text', 'Write article is text').isLength({ min: 3 }).isString(),
  body('tags', 'Write your tags').optional().isString(),
  body('imageUrl', 'Your link is incorrect').optional().isString(),
]
