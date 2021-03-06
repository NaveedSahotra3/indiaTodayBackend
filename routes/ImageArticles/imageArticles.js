const imageArticle = require("../../Models/imageArticle_schema");
const CategorySchema = require("../../Models/category_schema");
const sub_category_schema = require("../../Models/sub_category_schema");

const imageArticles = {
  create_article: async function (req, res) {
    try {
      let { title, description, category_id, isFeatured, sub_category } =
        req.body;
      let image;
      if (req.file) image = `${req.file.fieldname}-${req.file.originalname}`;

      isFeatured == "on" ? (isFeatured = true) : (isFeatured = false);
      // The data is valid and new we can register the user
      let newUser = new imageArticle({
        title,
        description,
        image,
        category_id,
        isFeatured: isFeatured,
        sub_category,
      });

      let result = await newUser.save();

      return res.json(result);
    } catch (err) {
      return res.status(err.status || 500).send(err.message);
    }
  },

  Delete_article: async function (req, res) {
    let find = await imageArticle.findById(req.body.id);

    if (find) {
      await find.delete();
      res.json("imageArticle Deleted");
      return find;
    } else {
      throw new Error("Book not Found");
    }
  },
  Update_article: async function (req, res) {
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

    // let update = await imageArticle.findOneAndUpdate({ _id: user_id }, data, {
    //   isNew: true,
    // });

    return res.json("Successfuly Updated");
  },

  Gets_article: async function (req, res) {
    try {
      const articles = await imageArticle.find();
      const cate = await CategorySchema.find();

      let all = [];
      for (let i = 0; i < articles.length; i++) {
        const element_i = articles[i];
        for (let j = 0; j < cate.length; j++) {
          const element_j = cate[j];
          if (element_i.category_id.toString() == element_j._id.toString()) {
            const sub_cate = await sub_category_schema.findOne({
              _id: element_i.sub_category.toString(),
            });
            let obj = {
              description: element_i.description,
              title: element_i.title,
              image: element_i.image,
              category_name: element_j.category_name,
              _id: element_i._id,
              isFeatured: element_i.isFeatured,
              sub_cate: sub_cate.sub_category_name,
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
      const featuredItems = await imageArticle.find({ isFeatured: true }).sort({"created_at": -1})

      return res.json(featuredItems);
    } catch (error) {
      console.log(error);
    }
  },
  getOneArticle: async function (req, res) {
    try {
      let data = Object.assign({}, req.body);
      const article = await imageArticle.find({ _id: data.id });

      return res.json(article);
    } catch (error) {
      console.log(error);
    }
  },  
  getCategoryArticles: async function (req, res) {
    try {
      let data = Object.assign({}, req.body);
      let articles = null
      if(data.category_id){
        articles = await imageArticle.find({category_id:data.category_id});
      } 
      if(data.sub_category){
        articles = await imageArticle.find({sub_category:data.sub_category});
      }
      return res.json(articles);
    } catch (error) {
      console.log(error);
    }
  },  
};

module.exports = imageArticles;
