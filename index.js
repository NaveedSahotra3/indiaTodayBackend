const express = require('express')
require("dotenv").config();
const connectDatabase = require("./DB/connection");
const app = express()
const path = require("path");


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const _dirname = path.resolve()
app.use("uploads", express.static(path.join(_dirname, 'uploads')));


// auth signUp login ForgetPassword
let auth = require('./auth/authentication')
app.post('/' , auth.register )
app.post('/login' , auth.login )
app.put('/forgetpassword' , auth.forget_password )
app.put('/resetpassword' , auth.reset_password )
app.post('/guest' , auth.Guest )

// const path = require("path");
const multer = require("multer")



// const _dirname = path.resolve()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads')
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${file.originalname.toLowerCase().split(' ').join('_')}`)
  }
})
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});
// const upload = multer({
//   storage
// })

app.use("uploads", express.static(path.join(_dirname, 'uploads')));

// restaurants CRUD
let restaurants = require('./Restaurants/restaurants')
app.get('/createrestaurants' , upload.single("image")  , restaurants.create_Res)
app.get('/delete_res' , restaurants.Delete_Res)
app.get('/update_res' , restaurants.Update_Res)
app.get('/gets_res' , restaurants.Gets_Res)



// Dish CRUD
let dish = require('./Dish/Dish')
app.get('/create_dish' , upload.single("image")  , dish.create_Dish)
app.get('/delete_dish' ,upload.single("image") , dish.Delete_Dish)
app.get('/update_dish' , dish.Update_Dish)
app.get('/gets_dish' , dish.Gets_Dish)












connectDatabase();
const PORT = process.env.PORT || 6000

app.listen(PORT , function(){
    console.log('server is started')
})
