import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

mongoose.connect(
  'mongodb+srv://admin:111@cluster0.edvx7.mongodb.net/?retryWrites=true&w=majority'
).then(() => console.log('Database is working'))
.catch((err) => console.log('Database is not working', err));

const app = express();

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello, Dima!')
});

app.post('/auth/login', (req, res) => {
  console.log(req.body)

  const token = jwt.sign({
    email: req.body.email,
    fullName: 'Ivan Ivanov'
  }, 
    "sercet"
  );

  res.json({
    success: true,
    token
  });
});

app.listen(4000, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server is working')
});
