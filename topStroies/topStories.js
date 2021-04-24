const express = require("express");
const app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const story = require("../DB/topStories_schema");

const Topstory = {
  create_story: function (req, res) {
    console.log(req.body);
    let image = `${req.file.fieldname}-${req.file.originalname}`;

    let newUser = new story({
      storytitle: req.body.storytitle,
 
      image,
      description: req.body.description,
     
    });

    newUser.save().then((item) => {
      res.json(  "Blog created Successfully");
    });
  },


  Delete_story: async function (req, res) {
    console.log(req.body);

    let find = await story.findById(req.body.id);

    if (find) {
      await find.delete();
      res.json("Restaurant Deleted");
      return find;
    } else {
      throw new Error("Book not Found");
    }
  },


  Update_story: async function (req, res) {
    console.log(req.body.id);

    let user_id = req.body.id;
    let update = await story.findOneAndUpdate(
      user_id,
      { 
          storytitle: req.body.storytitle, 
    
          description: req.body.description, 
      
          image
         },
      function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          res.json("Restaturant successfully updated");
          console.log("Updated User : ", docs);
        }
      }
    );
    return update;
  },

  Gets_story: async function (req, res) {
    try {
      const user = await story.find();
      res.json(user);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = Topstory;
