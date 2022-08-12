import PostSchema from '../models/post.js'

export const create = async (req, res) => {
  try {

      const doc = new PostSchema({
        title: req.body.title,
        text: req.body.text,
        tags: req.body.tags,
        imageUrl: req.body.imageUrl,
        user: req.userId
      });

      const post = await doc.save();
      res.json(post);
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: "Post is not created!"
    });
  }
}
