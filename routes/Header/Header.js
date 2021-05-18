const HeaderSchema = require("../../Models/header_schema");
// const SubCategorySchema = require("../../Models/sub_category_schema");
const Header = {
  add: async function (req, res) {
    try {
      let data = Object.assign({}, req.body);
      // The data is valid and new we can register the user
      let header = new HeaderSchema(data);
      let result = await header.save();

      return res.json(result);
    } catch (err) {
      return res.status(err.status || 500).send(err.message);
    }
  },

  detele: async function (req, res) {
    try {
      let { _id } = req.body;
      // Check this is admin
      let header = await HeaderSchema.findById({
        _id:_id,
      });
      if (!header)
        throw res.status(400).json({ msg: "Sub-Category Not found." });
      let deleted = await header.delete();
      return res.status(201).json({
        success: true,
        msg: "Successfully Deleted",
      });
    } catch (err) {
      return res.status(err.status || 500).send(err.message);
    }
  },

  update: async function (req, res) {
    try {
      let data = Object.assign({}, req.body);
      let headerId = data._id;
      let header = await SubCategorySchema.findById({
        _id: headerId,
      });

      if (!header)
        throw res.status(400).json({ msg: "Header Item Not found." });

      delete data._id;
      let update = await SubCategorySchema.findOneAndUpdate(
        { _id: headerId },
        { ...data },
        function (err, docs) {
          if (err) {
            console.log(err);
          } else {
            res.json("Sub-Category successfully updated");
            console.log("Updated User : ", docs);
          }
        }
      );
      return update;
    } catch (err) {
      return res.status(err.status || 500).send(err.message);
    }
  },

  get_all: async function (req, res) {
    try {
      const user = await HeaderSchema.find();
      res.json(user);
    } catch (error) {
      console.log(error);
    }
  },
  get_one: async function (req, res) {
    try {
      let data = Object.assign({}, req.body);
      let headerId = data._id;
      let header = await HeaderSchema.findById({
        _id: headerId,
      });

      res.json(header );
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = Header;
