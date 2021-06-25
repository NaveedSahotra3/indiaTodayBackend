const Gallery = require("../../Models/gallery_schema");


const Gallerys = {
  create_gallery: async function (req, res) {
    try {
      let { title , image } = req.body;
      // let image ;
     
      if (req.file) image = `${req.file.fieldname}-${req.file.originalname}`;

     
      // The data is valid and new we can register the user
      let newUser = new Gallery({
        title,
       
        image,
       
    
      });

      let result = await newUser.save();

      return res.json(result);
    } catch (err) {
      return res.status(err.status || 500).send(err.message);
    }
  },

  delete_gallery: async function (req, res) {
    let find = await Gallery.findById(req.body.id);

    if (find) {
      await find.delete();
      res.json("Gallery Deleted");
      return find;
    } else {
      throw new Error("Book not Found");
    }
  },
  update_gallery: async function (req, res) {
    console.log(req.body.id.id);
    let data = Object.assign({}, req.body);
    let user_id = req.body.id;
    let image;
    if (req.file) {
      image = `${req.file.fieldname}-${req.file.originalname}`;
      data.image = image;
    }
  

    let update = await Gallery.findOneAndUpdate({ _id: user_id }, data, {
      isNew: true,
    });

    return res.json("Successfuly Updated");
  },

  gets_gallery: async function (req, res) {
      console.log('comming')
    try {
      const user = await Gallery.find();
    
      return res.json(user);
    } catch (error) {
      console.log(error);
    }
  },


  getFeaturedItems: async function (req, res) {
    try {
      const featuredItems = await Gallery.find({ isFeatured: true }).sort({"created_at": -1})

      return res.json(featuredItems);
    } catch (error) {
      console.log(error);
    }
  },
  getOneArticle: async function (req, res) {
    try {
      let data = Object.assign({}, req.body);
      const article = await Gallery.find({ _id: data.id });

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
        articles = await Gallery.find({category_id:data.category_id});
      } 
      if(data.sub_category){
        articles = await Gallery.find({sub_category:data.sub_category});
      }
      return res.json(articles);
    } catch (error) {
      console.log(error);
    }
  },  
};

module.exports = Gallerys;
