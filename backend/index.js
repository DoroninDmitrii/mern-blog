import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import cors from "cors";
import { registerValidation, loginValidation, postCreateValidation } from './validation.js';

import { checkAuth, handleValidationErrors } from './utils/indexutils.js';

import { PostController, UserController } from './controllers/index.js';

mongoose.connect(
  'mongodb+srv://admin:111@cluster0.edvx7.mongodb.net/blog?retryWrites=true&w=majority'
).then(() => console.log('Database is working'))
  .catch((err) => console.log('Database is not working', err));

const app = express();

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage });

app.use(express.json());
app.use(cors());
app.use('/upload', express.static('uploads'));

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`
  })
})

app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update);


app.listen(4000, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server is working');
});
