const Banner = require("../../Models/banners");
// const SubCategorySchema = require("../../Models/sub_category_schema");
const Banners = {
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
    console.log(req.body.id.id);
    let data = Object.assign({}, req.body);
    let user_id = req.body.id;
    let image;
    if (req.file) {
      image = `${req.file.fieldname}-${req.file.originalname}`;
      data.image = image;
    }
    if (data.isFeatured) {
      data.isFeatured == "on"
        ? (data.isFeatured = true)
        : (data.isFeatured = false);
    }
    delete data.id;
    let update = await Banner.findOneAndUpdate({ _id: user_id }, data, {
      isNew: true,
    });

    return update;
  },

  get_all: async function (req, res) {
    try {
      const user = await Banner.find();
      res.json(user);
    } catch (error) {
      console.log(error);
    }
  },
  get_by_position: async function (req, res) {
    try {
      let data = Object.assign({}, req.body);
      const banner = await Banner.find({ banner_type: data.banner_type });
      res.json(banner);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = Banners;
