const CategorySchema = require("../../Models/category_schema");
const SubCategorySchema = require("../../Models/sub_category_schema");
const Sub_Category = {
  addCategory: async function (req, res) {
    try {
      let { category_id, sub_category_name } = req.body;
      let category_name;
      // If Sub_Category already exist
      let getCategory = await CategorySchema.findOne({ _id:category_id });
      if (getCategory) category_name = getCategory.category_name;

      // The data is valid and new we can register the user
      let newCategory = new SubCategorySchema({
        category_name,
        sub_category_name,
        category_id,
      });

      let result = await newCategory.save();

      return res.json(result);
    } catch (err) {
      return res.status(err.status || 500).send(err.message);
    }
  },

  deteleCategory: async function (req, res) {
    try {
      let { sub_category_id } = req.body;

      // Check this is admin
      let SubCategory = await SubCategorySchema.findById({ _id: sub_category_id });
      if (!SubCategory) throw res.status(400).json({ msg: "Sub-Category Not found." });

      let deleted = await SubCategory.delete();

      return res.status(201).json({
        success: true,
        msg: "Successfully Deleted",
      });
    } catch (err) {
      return res.status(err.status || 500).send(err.message);
    }
  },

  updateCategory: async function (req, res) {
    try {
      let data = Object.assign({}, req.body);

      let sub_category_id = data.sub_category_id;

      let Sub_Category = await SubCategorySchema.findById({ _id: sub_category_id });
      if (!Category) throw res.status(400).json({ msg: "Sub-Category Not found." });

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

  get_all_Category: async function (req, res) {
    try {
      const user = await SubCategorySchema.find();
      res.json(user);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = Sub_Category;
