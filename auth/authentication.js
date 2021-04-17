
var bcrypt = require('bcryptjs');
const User = require('../DB/auth_schema')
var jwt = require('jsonwebtoken');
const _ = require('lodash')
// const mailgun = require('mailgun-js')
const Guest = require('../DB/Guest_schema')

// const mg = mailgun({apiKey: api_key , domain : DOMAIN})
var nodemailer = require('nodemailer');

const auth = {
  register: function (req, res) {
    // var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    // User.create(
    //   {
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: hashedPassword,
    //   },
    //   function (err, user) {
    //     if (err)
    //       return res
    //         .status(500)
    //         .send("There was a problem registering the user.");
    //     // create a token
    //     var token = jwt.sign({ id: user._id }, "kjdfadskfnf",   {
    //       expiresIn: 86400, // expires in 24 hours
    //     });
    //     res.status(200).send({ auth: true, token: token });
    //   }
    // );

    let {
      name,
      email,
      password,
      
  } = req.body;

  if (!email || !password) {
      return res.send('Must include email and password')
  }
  User.findOne({
      email: email
  }).then(user => {
      if (user) {
          return res.status(400).json({ 
          
              msg: "Email is already registred. Did you forgot your password."
          });
      }
  });
  // The data is valid and new we can register the user
  let newUser = new User({
      name,
      // username,
      password,
      email
  });
  // Hash the password
  bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then(user => {
              return res.status(201).json({
                  success: true,
                  msg: "Hurry! User is now registered."
              });
          });
      });
  });
  },

  login: function(req, res) {

    User.findOne({ email: req.body.email }, function (err, user) {
      if (err) return res.status(500).send('Error on the server.');
      if (!user) return res.status(404).send('No user found.');
      
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
      
      var token = jwt.sign({ id: user._id }, "kjdfadskjhkjkhfnf", {
        expiresIn: 86400 // expires in 24 hours
      });
      
      res.status(200).send({ auth: true, token: token });
    });
    
  },



  
  forget_password: function(req , res){
//     const {email} =req.body;

// User.findOne({email} , (err , user) =>{
//   if(err || !user){
//     return res.status(400).json({error : "user with this email does not exist"})
//   }

//   const token = jwt.sign({ _id: user._id } , 'asdfvadfga' , {expiresIn: '20m'})
//   const data ={
//     from : 'naveed.sahotra3@gmail.com',
//     to: email,
//     subject : "Account Activation Link",
// html : `<h2> Please click an given lik to reset your password </h2>
// <p> http://localhost:6000/resetpassword/${token} </p>
// `
//   };
//   return user.updateOne({resetLink : token } , function (err , succeess){
// if(err){
//   return res.status(400).json({error : "reset password link error"})

// }else{
//   mg.messages().send(data , function(error , success){
//     // console.log(error)
//     if(error){
//       return res.json({
//         error: err.message
//       })
//     }
//     return res.json({message : "email has been sent , kindly check your account"})
//   })
// }



//   })
// })
User.findOne({ email: req.body.email }, function (error, userData) {
  if(userData==null)
  {
      return res.status(404).json({
          success: false,
          msg: "Email is not register",
      });
  }
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    // ssl:     true,
    secure: false,
    requireTLS: true,

    auth: {
      user: 'MenuMonkey1@gmail.com', // generated ethereal user
      pass: 'mymenu12'  // generated ethereal password
    },

  });
  var currentDateTime = new Date();
  var mailOptions = {
      from: '"Menu Monkey" <MenuMonkey1@gmail.com>',
      to: req.body.email,
      subject: 'Password Reset',
      // text: 'That was easy!',
      html: "<h1>Welcome To Menu Monkey Reset Password ! </h1><p>\
      <h3>Hello "+userData.name+"</h3>\
      If You are requested to reset your password then click on below link <br/>\
      <h2> http://localhost:6000/resetpassword/"+currentDateTime+"+++"+userData.email+"'Click On This Link</h2>\
      </p>"
  };

  transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
          console.log(error);
      } else {
          console.log('Email sent: ' + info.response);
          User.updateOne({email: userData.email}, {
              token: currentDateTime, 
              
          },  {multi:true},function(err, affected, resp) {
              return res.status(200).json({
                  success: false,
                  msg: info.response,
                  userlist: resp
              });
          })
      }
  });
})


  },
  
  reset_password : function(req , res){


//     const {resetLink , newPass} = req.body
//     if(resetLink){

// jwt.verify(resetLink , 'asdfvadfga' , function(err , decodedData){
//   if(err){
//     return res.status(401).json({
//       error: "Incorrect Token or it is expired"
//     })
//   }
//   User.findOne({resetLink} , (err , user) =>{
//     if(err || !user){

// return res.status(400).json({error: "User with this token does not exists "})

//     }

//     const obj = {
//       password : newPass
//     }

//     user = _.extend(user , obj)

//     user.save((err , result)=>{
//       if(err){
//         return res.status(400).json({error: "reset password  error"})
//       }else {

// return res.status(200).json({message : 'Your password has been changed'})
//       }
//     })

//   } )
// })

//     }else{
//       if(err || !user){
//         return res.status(401).json({error : "authentication error"})
//       }
//     }

User.findOne({ email: req.body.email }, function (errorFind, userData) {
  if(userData.token==req.body.linkDate)
  {
      bcrypt.genSalt(10, (errB, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
              if (err) throw err;
              let newPassword = hash;
              let condition = { _id: userData._id };
              let dataForUpdate = { password: newPassword,updatedDate: new Date() };
              User.findOneAndUpdate(condition, dataForUpdate, { new: true }, function (error, updatedUser) {
                  if (error) {
                      if (err.name === 'MongoError' && error.code === 11000) {
                        return res.status(500).json({msg:'Mongo Db Error', error:error.message});
                      }else{
                          return res.status(500).json({msg:'Unknown Server Error', error:'Unknow server error when updating User'});
                      }
                  }
                  else{
                          if (!updatedUser) {
                              return res.status(404).json({
                                  msg: "User Not Found.",
                                  success: false
                              });
                          }else{
                          return res.status(200).json({
                              success: true,
                              msg: "Your password are Successfully Updated",
                              updatedData: updatedUser
                          });
                      }
                  }
              });
          });
      });
  }
  if (errorFind)
  {
          return res.status(401).json({
          msg: "Something Went Wrong",
          success: false
      });
  }
}
);

  },


Guest : function(req , res){
const {first_name , last_name , email , number} = req.body
    console.log(req.body)
    const Guestss = new Guest({
        first_name : first_name,
        last_name : last_name,
        email : email,
        number : number,

    })

    Guestss.save((err , success)=>{
        if(err){
            console.log(err)
        }
        else{
           return res.json({msg: "success"})
        }
    })

  


}


};

module.exports = auth;
