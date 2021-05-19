const SideBarSchema = require("../../Models/sidebar_schema");
// const SubCategorySchema = require("../../Models/sub_category_schema");
const SideBar = {
  add: async function (req, res) {
    try {
      let data = Object.assign({}, req.body);
      // The data is valid and new we can register the user
      let sidebar = new SideBarSchema(data);
      let result = await sidebar.save();

      return res.json(result);
    } catch (err) {
      return res.status(err.status || 500).send(err.message);
    }
  },

  detele: async function (req, res) {
    try {
      let { _id } = req.body;
      // Check this is admin
      let Sidebar = await SideBarSchema.findById({
        _id: _id,
      });
      if (!Sidebar)
        throw res.status(400).json({ msg: "Sidebar Section Not found." });
      let deleted = await Sidebar.delete();
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
      let sidebarId = data._id;
      let SideBar = await SideBarSchema.findById({
        _id: sidebarId,
      });

      if (!SideBar)
        throw res.status(400).json({ msg: "SideBar Item Not found." });

      delete data._id;
      let update = await SideBarSchema.findOneAndUpdate(
        { _id: sidebarId },
        { ...data }
      );
      
      return res.json("SideBar successfully updated");
    } catch (err) {
      return res.status(err.status || 500).send(err.message);
    }
  },

  get_all: async function (req, res) {
    try {
      const user = await SideBarSchema.find();
      res.json(user);
    } catch (error) {
      console.log(error);
    }
  },
  get_one: async function (req, res) {
    try {
      let data = Object.assign({}, req.body);
      let sidebarId = data._id;
      let SideBar = await SideBarSchema.findById({
        _id: sidebarId,
      });

      res.json(SideBar);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = SideBar;
