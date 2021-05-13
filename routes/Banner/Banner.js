const Banner = require("../../Models/banners");
// const SubCategorySchema = require("../../Models/sub_category_schema");
const Sub_Category = {
  add: async function (req, res) {
    try {
      let data = Object.assign({}, req.body);
      data.image = [];
      if (req.file) {
        data.image = `${req.file.fieldname}-${req.file.originalname}`;
      }

      // The data is valid and new we can register the user
      let banner = new Banner(data);

      let result = await banner.save();

      return res.json(result);
    } catch (err) {
      return res.status(err.status || 500).send(err.message);
    }
  },

  detele: async function (req, res) {
    try {
      let { id } = req.body;

      // Check this is admin
      let banner = await Banner.findById({
        _id: id,
      });
      if (!banner)
        throw res.status(400).json({ msg: "Sub-Category Not found." });
      let deleted = await banner.delete();
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
      let sub_category_id = data.sub_category_id;
      let Sub_Category = await SubCategorySchema.findById({
        _id: sub_category_id,
      });
      if (!Category)
        throw res.status(400).json({ msg: "Sub-Category Not found." });

      delete data.sub_category_id;
      let update = await SubCategorySchema.findOneAndUpdate(
        { _id: sub_category_id },
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
      const user = await Banner.find();
      res.json(user);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = Sub_Category;
