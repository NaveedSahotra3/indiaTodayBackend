const TeamMember = require("../../Models/TeamMember_schema");
const CategorySchema = require("../../Models/category_schema");
const sub_category_schema = require("../../Models/sub_category_schema");

const teamMember = {
  create_article: async function (req, res) {
    try {
      let { title, position ,description  , image } = req.body;
      // let image ;
     
      if (req.file) image = `${req.file.fieldname}-${req.file.originalname}`;

     
      // The data is valid and new we can register the user
      let newUser = new TeamMember({
        title,
        description,
        image,
        position,
    
      });

      let result = await newUser.save();

      return res.json(result);
    } catch (err) {
      return res.status(err.status || 500).send(err.message);
    }
  },

  Delete_article: async function (req, res) {
    let find = await TeamMember.findById(req.body.id);

    if (find) {
      await find.delete();
      res.json("TeamMember Deleted");
      return find;
    } else {
      throw new Error("Book not Found");
    }
  },
  Update_team: async function (req, res) {
    // let user_id = body.id
    // let update =   await TeamMember.findOneAndUpdate(
    //      user_id,
    //      { title: body.title, position: body.position , description: body.description },
    //      function (err, docs) {
    //        if (err) {
    //          console.log(err);
    //        } else {
    //          console.log("Updated User : ", docs);
    //        }
    //      }
    //    );

    console.log(req.body.id);
    let data = Object.assign({}, req.body);
    let user_id = req.body.id;
    let image;
    if (req.file) {
      image = `${req.file.fieldname}-${req.file.originalname}`;
      data.image = image;
    }
   

    let update = await TeamMember.findOneAndUpdate({ _id: user_id }, data, {
      isNew: true,
    });

    return res.json("Successfuly Updated");


    // let find = await TeamMember.findById(req.body.id);

    // if (find) {
    //   await find.findOneAndUpdate();
    //   res.json("TeamMember updated");
    //   return find;
    // } else {
    //   throw new Error("Not Updated");
    // }
  },

  Gets_article: async function (req, res) {
    try {
      const user = await TeamMember.find();
    
      return res.json(user);
    } catch (error) {
      console.log(error);
    }
  },
  getFeaturedItems: async function (req, res) {
    try {
      const featuredItems = await TeamMember.find({ isFeatured: true }).sort({"created_at": -1})

      return res.json(featuredItems);
    } catch (error) {
      console.log(error);
    }
  },
  getOneArticle: async function (req, res) {
    try {
      let data = Object.assign({}, req.body);
      const article = await TeamMember.find({ _id: data.id });

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
        articles = await TeamMember.find({category_id:data.category_id});
      } 
      if(data.sub_category){
        articles = await TeamMember.find({sub_category:data.sub_category});
      }
      return res.json(articles);
    } catch (error) {
      console.log(error);
    }
  },  
};

module.exports = teamMember;
