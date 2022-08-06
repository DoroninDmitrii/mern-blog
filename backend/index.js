import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { registerValidation } from './validation/auth.js';
import { validationResult } from "express-validator";

mongoose.connect(
  'mongodb+srv://admin:111@cluster0.edvx7.mongodb.net/?retryWrites=true&w=majority'
).then(() => console.log('Database is working'))
.catch((err) => console.log('Database is not working', err));

const app = express();

app.use(express.json())

app.post('/auth/register', registerValidation, (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array())
  } else {
    return res.json({
      success: true
    })
  }
});

app.listen(4000, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server is working')
});
