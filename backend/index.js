import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

mongoose.connect(
  'mongodb+srv://admin:111@cluster0.edvx7.mongodb.net/?retryWrites=true&w=majority'
).then(() => console.log('Database is working'))
.catch((err) => console.log('Database is not working', err));

const app = express();

app.use(express.json())

app.post('/auth/register', (req, res) => {

});

app.listen(4000, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server is working')
});
