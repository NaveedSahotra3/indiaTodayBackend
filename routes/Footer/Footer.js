const FooterSchema = require("../../Models/footer_schema");
// const SubCategorySchema = require("../../Models/sub_category_schema");
const Footer = {
  add: async function (req, res) {
    try {
      let data = Object.assign({}, req.body);
      // The data is valid and new we can register the user
      let footer = new FooterSchema(data);
      let result = await footer.save();

      return res.json(result);
    } catch (err) {
      return res.status(err.status || 500).send(err.message);
    }
  },

  detele: async function (req, res) {
    try {
      let { _id } = req.body;
      // Check this is admin
      let Footer = await FooterSchema.findById({
        _id: _id,
      });
      if (!Footer)
        throw res.status(400).json({ msg: "Footer Section Not found." });
      let deleted = await Footer.delete();
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
      let footerId = data._id;
      let Footer = await FooterSchema.findById({
        _id: footerId,
      });

      if (!Footer)
        throw res.status(400).json({ msg: "Footer Item Not found." });

      delete data._id;
      let update = await FooterSchema.findOneAndUpdate(
        { _id: footerId },
        { ...data }
      );
      
      return res.json("Footer successfully updated");
    } catch (err) {
      return res.status(err.status || 500).send(err.message);
    }
  },

  get_all: async function (req, res) {
    try {
      const user = await FooterSchema.find();
      res.json(user);
    } catch (error) {
      console.log(error);
    }
  },
  get_one: async function (req, res) {
    try {
      let data = Object.assign({}, req.body);
      let footerId = data._id;
      let Footer = await FooterSchema.findById({
        _id: footerId,
      });

      res.json(Footer);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = Footer;
