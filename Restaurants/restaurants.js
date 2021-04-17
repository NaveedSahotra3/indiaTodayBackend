
const express = require('express')
const app = express()
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const restaurant = require('../DB/restaurants_schema')





const restaurants ={


    create_Res : function(req , res){
        console.log(req.body)
        let image = `${req.file.fieldname}-${req.file.originalname}`
       
        let newUser = new restaurant({
          title: req.body.title,
          description: req.body.description,
          image
        })
      
        newUser.save().then((item) => {
         
          res.json("Blog created Successfully");
        })
    },

    Delete_Res : async function(req , res){

        console.log(req.body);

        let find = await restaurant.findById(req.body.id);
  
        if (find) {
          await find.delete();
          res.json("Restaurant Deleted");
          return find;
  
        } else {
            
          throw new Error("Book not Found");
        }
    }
,
    Update_Res : async function(req , res){

        console.log(req.body.id);

        // let find = await BookSchema.findById(req.body.id);
        // console.log(find);
        // if (find) {
          let user_id = req.body.id
       let update =   await restaurant.findOneAndUpdate(
            user_id,
            { title: req.body.title, author: req.body.author },
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

    Gets_Res : async function(req , res){

        try {
            const user = await restaurant.find()
            res.json(user)
          } catch (error) {
            console.log(error)
          }
        
    }





}

module.exports = restaurants;
