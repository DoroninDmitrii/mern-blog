import PostSchema from '../models/post.js'


export const getTags = async (req, res) => {
  try {
    const posts = await PostSchema.find().limit(5).exec();
    const tags = posts.map(obj => obj.tags).flat().slice(0, 5);
    return res.json(tags);
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: "There are not posts!"
    });
  }
}

export const getAll = async (req, res) => {
  try {
    const posts = await PostSchema.find().populate('user').exec();
    return res.json(posts);
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: "There are not posts!"
    });
  }
};

export const getOne = (req, res) => {
  try {
    const postId = req.params.id;
    PostSchema.findByIdAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: 'after',
      },
      (err, doc) => {
        if (err) {
          console.log(err)
          return res.status(500).json({
            message: "There is not post!"
          });
        }
        if (!doc) {
          return res.status(404).json({
            message: 'Article is not exist!'
          })
        };
        res.json(doc);
      }
    )
  } catch (err) {
    console.log(err)
  };
};

export const remove = (req, res) => {
  try {
    const postId = req.params.id;
    PostSchema.findByIdAndDelete(
      {
        _id: postId,
      },
      (err, doc) => {
        if (err) {
          console.log(err)
          return res.status(500).json({
            message: "Delete is not happend!"
          });
        }
        if (!doc) {
          return res.status(404).json({
            message: 'Article is not exist!'
          })
        }
        return res.json({
          success: true
        })
      }
    )
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: "There is not post!"
    });
  };
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostSchema.updateOne({
      _id: postId,
    }, 
    {
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      user: req.userId,
      tags: req.body.tags,
    });
    res.json({
      success: true
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: "Article is not update!"
    });
  }
}

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
