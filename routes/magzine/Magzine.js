
const Magzine = require("../../Models/magzine_schema");


const Magzines = {
    Create: async function (req, res) {
    try {
      let { title, description  , image } = req.body;
      // let image ;
     
      if (req.file) image = `${req.file.fieldname}-${req.file.originalname}`;

     
      // The data is valid and new we can register the user
      let newUser = new Magzine({
        title,
        description,
        image,
            
      });

      let result = await newUser.save();

      return res.json(result);
    } catch (err) {
      return res.status(err.status || 500).send(err.message);
    }
  },

  Delete_Magzine: async function (req, res) {
    let find = await Magzine.findById(req.body.id);

    if (find) {
      await find.delete();
      res.json("Magzine Deleted");
      return find;
    } else {
      throw new Error("Magzine not Found");
    }
  },
  Update_magzine: async function (req, res) {
    console.log(req.body.id.id);
    let data = Object.assign({}, req.body);
    let user_id = req.body.id;
    let image;
    if (req.file) {
      image = `${req.file.fieldname}-${req.file.originalname}`;
      data.image = image;
    }
    // if (data.isFeatured) {
    //   data.isFeatured == "on"
    //     ? (data.isFeatured = true)
    //     : (data.isFeatured = false);
    // }

    let update = await Magzine.findOneAndUpdate({ _id: user_id }, data, {
      isNew: true,
    });

    return res.json("Successfuly Updated");
  },

  Gets_Magzines: async function (req, res) {
    try {
      const user = await Magzine.find();
    
      return res.json(user);
    } catch (error) {
      console.log(error);
    }
  },
  getFeaturedItems: async function (req, res) {
    try {
      const featuredItems = await Magzine.find({ isFeatured: true }).sort({"created_at": -1})

      return res.json(featuredItems);
    } catch (error) {
      console.log(error);
    }
  },
  getOneArticle: async function (req, res) {
    try {
      let data = Object.assign({}, req.body);
      const article = await Magzine.find({ _id: data.id });

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
        articles = await Magzine.find({category_id:data.category_id});
      } 
      if(data.sub_category){
        articles = await Magzine.find({sub_category:data.sub_category});
      }
      return res.json(articles);
    } catch (error) {
      console.log(error);
    }
  },  
};

module.exports = Magzines;
