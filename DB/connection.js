const mongoose = require("mongoose");

const connectDb = async () => {
  mongoose
    .connect(process.env.MONOGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true 
    })
    .then((res) => console.log(`Db connected on ${res.connection.user}`));
};
module.exports = connectDb;
