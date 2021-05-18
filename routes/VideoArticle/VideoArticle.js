const videoArticle = require("../../Models/videoArticleSchema");
const CategorySchema = require("../../Models/category_schema");
const imageArticles = {
  create_video: async function (req, res) {
    try {
      let { title, description, category_id, isFeatured } = req.body;
      let image;
      if (req.file) image = `${req.file.fieldname}-${req.file.originalname}`;

      isFeatured == "on" ? (isFeatured = true) : (isFeatured = false);
      // The data is valid and new we can register the user
      let newUser = new videoArticle({
        title,
        description,
        image,
        category_id,
        isFeatured: isFeatured,
      });

      let result = await newUser.save();

      return res.json(result);
    } catch (err) {
      return res.status(err.status || 500).send(err.message);
    }
  },

  Delete_video: async function (req, res) {
    let find = await videoArticle.findById(req.body.id);

    if (find) {
      await find.delete();
      res.json("videoArticle Deleted");
      return find;
    } else {
      throw new Error("Book not Found");
    }
  },


  Update_video: async function (req, res) {
    console.log(req.body.id.id);
    let data = Object.assign({}, req.body);
    let user_id = req.body.id;
    let image;
    if (req.file) {
      image = `${req.file.fieldname}-${req.file.originalname}`;
      data.image = image;
    }
    if (data.isFeatured) {
      data.isFeatured == "on"
        ? (data.isFeatured = true)
        : (data.isFeatured = false);
    }
    delete data.id
    let update = await videoArticle.findOneAndUpdate({ _id: user_id }, data, {
      isNew: true,
    });

    return update;
  },

  Gets_video: async function (req, res) {
    try {
      const user = await videoArticle.find();
      const cate = await CategorySchema.find();

      let all = [];
      for (let i = 0; i < user.length; i++) {
        const element_i = user[i];
        for (let j = 0; j < cate.length; j++) {
          const element_j = cate[j];
          if (element_i.category_id.toString() == element_j._id.toString()) {
            let obj = {
              description: element_i.description,
              title: element_i.title,
              image: element_i.image,
              category_name: element_j.category_name,
              _id: element_i._id,
              isFeatured: element_i.isFeatured
            };
            all.push(obj);
          }
        }
      }

      return res.json(all);
    } catch (error) {
      console.log(error);
    }
  },
  getFeaturedItems: async function (req, res) {
    try {
      const featuredItems = await videoArticle.find({ isFeatured: true });

      return res.json(featuredItems);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = imageArticles;
