// const TalkShow = require("../../Models/imageArticle_schema");
const TalkShow = require("../../Models/Talkshow_schema");
// const sub_category_schema = require("../../Models/sub_category_schema");

const Talkshows = {
    Create: async function (req, res) {
    try {
      let { title, subtitle ,description  , image } = req.body;
      // let image ;
     
      if (req.file) image = `${req.file.fieldname}-${req.file.originalname}`;

     
      // The data is valid and new we can register the user
      let newUser = new TalkShow({
        title,
        description,
        image,
        subtitle,
    
      });

      let result = await newUser.save();

      return res.json(result);
    } catch (err) {
      return res.status(err.status || 500).send(err.message);
    }
  },

  Delete_TalkShow: async function (req, res) {
    let find = await TalkShow.findById(req.body.id);

    if (find) {
      await find.delete();
      res.json("TalkShow Deleted");
      return find;
    } else {
      throw new Error("Book not Found");
    }
  },
  Update: async function (req, res) {
    console.log(req.body.id);
    let data = Object.assign({}, req.body);
    let user_id = req.body.id;
    let image;
    if (req.file) {
      image = `${req.file.fieldname}-${req.file.originalname}`;
      data.image = image;
    }
   

    let update = await TalkShow.findOneAndUpdate({ _id: user_id }, data, {
      isNew: true,
    });

    return res.json("Successfuly Updated");
  },

  Gets_talkshows: async function (req, res) {
    try {
      const user = await TalkShow.find();
    
      return res.json(user);
    } catch (error) {
      console.log(error);
    }
  },
  getFeaturedItems: async function (req, res) {
    try {
      const featuredItems = await TalkShow.find({ isFeatured: true }).sort({"created_at": -1})

      return res.json(featuredItems);
    } catch (error) {
      console.log(error);
    }
  },
  getOneArticle: async function (req, res) {
    try {
      let data = Object.assign({}, req.body);
      const article = await TalkShow.find({ _id: data.id });

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
        articles = await TalkShow.find({category_id:data.category_id});
      } 
      if(data.sub_category){
        articles = await TalkShow.find({sub_category:data.sub_category});
      }
      return res.json(articles);
    } catch (error) {
      console.log(error);
    }
  },  
};

module.exports = Talkshows;
