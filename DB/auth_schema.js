const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const signup = new Schema({
  name: {
  type:  String,
  trim: true,
  required: true,
  max:64
  },
  email: {
    type:  String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  resetLink : {
    data : String,
    default: ''
  },
  status:{
    type:Boolean,
    default:1
},
token:{
    type:String,
    default:''
},
createdDate: {
    type: Date,
    default: Date.now
},
updatedDate: {
    type: Date,
    default: null
},
deletedDate: {
    type: Date,
    default: null
}
},

//  {timestamps : true}
 );

module.exports = mongoose.model("graphql", signup);
