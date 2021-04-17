const express = require("express");
const app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const dish = require("../DB/Dish_schema");

const Dish = {
  create_Dish: function (req, res) {
    console.log(req.body);
    let image = `${req.file.fieldname}-${req.file.originalname}`;

    let newUser = new dish({
      dishname: req.body.dishname,
      price: req.body.price,
      image,
      description: req.body.description,
      ingredients: req.body.ingredients,
    });

    newUser.save().then((item) => {
      res.json(  "Blog created Successfully");
    });
  },


  Delete_Dish: async function (req, res) {
    console.log(req.body);

    let find = await dish.findById(req.body.id);

    if (find) {
      await find.delete();
      res.json("Restaurant Deleted");
      return find;
    } else {
      throw new Error("Book not Found");
    }
  },


  Update_Dish: async function (req, res) {
    console.log(req.body.id);

    let user_id = req.body.id;
    let update = await dish.findOneAndUpdate(
      user_id,
      { 
          dishname: req.body.dishname, 
          price: req.body.price,
          description: req.body.description, 
          ingredients: req.body.ingredients,
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

  Gets_Dish: async function (req, res) {
    try {
      const user = await dish.find();
      res.json(user);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = Dish;
