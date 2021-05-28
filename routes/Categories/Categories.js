const CategorySchema = require("../../Models/category_schema");
const sub_category_schema = require("../../Models/sub_category_schema");


const Category = {
  addCategory: async function (req, res) {
    try {
      let { category_name, description } = req.body;
      let image;
      if (req.file) image = `${req.file.fieldname}-${req.file.originalname}`;

      // If Category already exist
      let getCategory = await CategorySchema.findOne({ category_name });
      if (getCategory)
        throw res
          .status(400)
          .json({ msg: "category with same name already there." });

      // The data is valid and new we can register the user
      let newCategory = new CategorySchema({
        category_name,
        description,
        image,
      });

      let result = await newCategory.save();

      return res.json(result);
    } catch (err) {
      return res.status(err.status || 500).send(err.message);
    }
  },

  deteleCategory: async function (req, res) {
    try {
      let { category_id } = req.body;

      // Check this is admin
      let Category = await CategorySchema.findById({ _id: category_id });
      if (!Category) throw res.status(400).json({ msg: "Category Not found." });

      let deleted = await Category.delete();

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

      let Category_id = data.category_id;

      let Category = await CategorySchema.findById({ _id: Category_id });
      if (!Category) throw res.status(400).json({ msg: "Category Not found." });

      delete data.category_id;
      let update = await CategorySchema.findOneAndUpdate(
        { _id: Category_id },
        { ...data },
        function (err, docs) {
          if (err) {
            console.log(err);
          } else {
            res.json("Category successfully updated");
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
      const user = await CategorySchema.find();
      const sub_category = await sub_category_schema.find();
      let all = [];
      for (let i = 0; i < user.length; i++) {
        const element_i = user[i];
        let sub_cate = [];
        for (let j = 0; j < sub_category.length; j++) {
          const element_j = sub_category[j];
          if (element_j.category_id.toString() == element_i._id.toString()) {
            sub_cate.push(element_j);
          }
        }
        let obj = {
          _id: element_i._id,
          category_name: element_i.category_name,
          description:element_i.description,
          image:element_i.image,
          sub_cate
        }
        all.push(obj)
      }

      res.json(all);
    } catch (error) {
      console.log(error);
    }
  },


  get_one_Category: async function (req, res) {
    try {
      let data = Object.assign({}, req.body);
      let categoryId = req.body.id;
      let singleCategory = await CategorySchema.findById(categoryId).lean();
      const sub_category = await sub_category_schema.find({category_id: categoryId});
      singleCategory.sub_cate = sub_category

      console.log(singleCategory)
      res.json(singleCategory );
    } catch (error) {
      console.log(error);
    }
  },

};

module.exports = Category;
