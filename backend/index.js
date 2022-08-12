import express from "express";
import mongoose from "mongoose";
import { registerValidation, loginValidation } from './validation.js';

import { checkAuth } from './utils/checkAuth.js';

import * as UserController from './controllers/UserController.js';

mongoose.connect(
  'mongodb+srv://admin:111@cluster0.edvx7.mongodb.net/blog?retryWrites=true&w=majority'
).then(() => console.log('Database is working'))
  .catch((err) => console.log('Database is not working', err));

const app = express();
app.use(express.json());

app.post('/auth/login', loginValidation, UserController.login);
app.post('/auth/register', registerValidation, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.listen(4000, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server is working');
});
