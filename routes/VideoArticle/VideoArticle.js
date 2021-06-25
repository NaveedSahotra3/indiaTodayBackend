const videoArticle = require("../../Models/videoArticleSchema");
const CategorySchema = require("../../Models/category_schema");

const vidArticle = {
  create_video: async function (req, res) {
    try {
      let { videolink } =
        req.body;
      // let image;
      // if (req.file) image = `${req.file.fieldname}-${req.file.originalname}`;

      // isFeatured == "on" ? (isFeatured = true) : (isFeatured = false);
      // The data is valid and new we can register the user
      let newUser = new videoArticle({
        videolink
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
      let result = await find.delete();

      return res.json("videoArticle Deleted");
    } else {
      throw new Error("Book not Found");
    }
  },

  Update_video: async function (req, res) {
    console.log(req.body.id);
    let data = Object.assign({}, req.body);
    let user_id = req.body.id;
    // let image;
    // if (req.file) {
    //   image = `${req.file.fieldname}-${req.file.originalname}`;
    //   data.image = image;
    // }

    // delete data.id;
    let update = await videoArticle.findOneAndUpdate({ _id: user_id }, data, {
      isNew: true,
    });

    return res.json("Successfuly Updated");
  },

  Gets_video: async function (req, res) {
    try {
      const user = await videoArticle.find();
    
      return res.json(user);
    } catch (error) {
      console.log(error);
    }
  },


  Get_one_video: async function (req, res) {
    console.log(req.body.id);

    let find = await videoArticle.find();

    if (find) {
      return res.json(find);;
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

module.exports = vidArticle;
