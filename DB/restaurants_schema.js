
const mongoose = require('mongoose')

const schema = mongoose.Schema

const restaurant = new schema({
    title: {
        type:  String,
        trim: true,
        required: true,
        max:64
        },

        image:{
            type : String
        },

        description: {
            type:  String,
            trim: true,
            required: true,
            max:64
            },
    

        



})

module.exports = mongoose.model("restaurants", restaurant);
