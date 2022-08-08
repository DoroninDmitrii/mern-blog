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

app.post('/auth/login', async (req, res) => {

  try {
    const user = await UserSchema.findOne({email: req.body.email})

    if (!user) {
      return res.status(404).json({ message: 'User is not exist!' });
    };

    const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

    if (!isValidPass) {
      return res.status(400).json({ message: 'Your login or password is not correct!'})
    }

    const token = jwt.sign({ 
      _id: user._id
    }, 'secretWord', {
      expiresIn: '30d'
    });

    const {passwordHash, userData} = user._doc;

    return res.json({...userData, token});

  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: "Your login have problems"
    })
  }
})

app.post('/auth/register', registerValidation, async (req, res) => {

  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array())
    } else {

      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt)

      const data = new UserSchema({
        email: req.body.email,
        passwordHash: hash,
        fullName: req.body.fullName,
        avatarUrl: req.body.avatarUrl,
      })

      const user = await data.save();

      const token = jwt.sign({
        _id: user._id,
      },
        'secretWord',
        {
          expiresIn: '30d',
        },
      );

      const { passwordHash, ...userData } = user._doc; 

      return res.json({...userData, token});
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
