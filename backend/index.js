import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import mongoose from "mongoose";
import { registerValidation } from './validation/auth.js';
import { validationResult } from "express-validator";

import UserSchema from './models/user.js'

mongoose.connect(
  'mongodb+srv://admin:111@cluster0.edvx7.mongodb.net/blog?retryWrites=true&w=majority'
).then(() => console.log('Database is working'))
  .catch((err) => console.log('Database is not working', err));

const app = express();
app.use(express.json());

app.post('/auth/register', registerValidation, async (req, res) => {

  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array())
    } else {

      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt)

      const userData = new UserSchema({
        email: req.body.email,
        passwordHash,
        fullName: req.body.fullName,
        avatarUrl: req.body.avatarUrl,
      })

      const user = await userData.save();

      const token = jwt.sign({
        _id: user._id,
      },
        'secretWord',
        {
          expiresIn: '30d',
        },
      );

      return res.json({...user, token});
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: "Your registration have problems"
    })
  }
});

app.listen(4000, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server is working')
});
