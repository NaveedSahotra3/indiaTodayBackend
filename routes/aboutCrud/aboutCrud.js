const AboutCrud = require("../../Models/About");
const CategorySchema = require("../../Models/category_schema");
const sub_category_schema = require("../../Models/sub_category_schema")

const AboutCruds = {
  create_AboutCrud: async function (req, res) {
    try {
      let {  description} = req.body;
     
    
      // The data is valid and new we can register the user
      let newUser = new AboutCrud({
        
        description,
      
      });

      let result = await newUser.save();

      return res.json(result);
    } catch (err) {
      return res.status(err.status || 500).send(err.message);
    }
  },

  Delete_AboutCrud: async function (req, res) {
    console.log(req.body);

    let find = await AboutCrud.findById(req.body.id);

    if (find) {
      await find.delete();
      res.json("AboutCrud Deleted");
      return find;
    } else {
      throw new Error("AboutCrud not Found");
    }
  },
  Update_AboutCrud: async function (req, res) {
    console.log(req.body.id.id);
    let data = Object.assign({}, req.body);
    let user_id = req.body.id;
    let image;
    if (req.file) {
      image = `${req.file.fieldname}-${req.file.originalname}`;
      data.image = image;
    }
   
    // delete data.id;
    let update = await AboutCrud.findOneAndUpdate({ _id: user_id }, data, {
      isNew: true,
    });
    return res.json("Successfuly Updated");
  },
  GetOne_AboutCrud: async function (req, res) {
    console.log(req.body);

    let find = await AboutCrud.find({_id:req.body.id});

    if (find) {
      return res.json(find);;
    } 

  },
  
  Gets_AboutCrud: async function (req, res) {
    try {
      const user = await AboutCrud.find();
    
      return res.json(user);
    } catch (error) {
      console.log(error);
    }
  },

};

module.exports = AboutCruds;
