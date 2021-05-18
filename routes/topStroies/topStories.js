const story = require("../../Models/topStories_schema");
const CategorySchema = require("../../Models/category_schema");

const Topstory = {
  create_story: async function (req, res) {
    try {
      let { storytitle, description, category_id, isFeatured } = req.body;
      let image;
      if (req.file) image = `${req.file.fieldname}-${req.file.originalname}`;
      isFeatured == "on" ? (isFeatured = true) : (isFeatured = false);
      // The data is valid and new we can register the user
      let newUser = new story({
        storytitle,
        description,
        image,
        category_id,
        isFeatured,
      });

      let result = await newUser.save();

      return res.json(result);
    } catch (err) {
      return res.status(err.status || 500).send(err.message);
    }
  },

  Delete_story: async function (req, res) {
    console.log(req.body);

    let find = await story.findById(req.body.id);

    if (find) {
      await find.delete();
      res.json("Story Deleted");
      return find;
    } else {
      throw new Error("Story not Found");
    }
  },

  Update_story: async function (req, res) {
    let image = `${req.file.fieldname}-${req.file.originalname}`;
    let user_id = req.params.id;
    let update = await story.findOneAndUpdate(
      user_id,
      {
        storytitle: req.body.storytitle,
        description: req.body.description,
        image,
      },
      function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          res.json("Restaturant successfully updated");
          console.log("Updated User : ", docs);
        }
      }
    );
    return update;
  },
  Gets_story: async function (req, res) {
    try {
      const user = await story.find();
      const cate = await CategorySchema.find();
      let all = [];
      for (let i = 0; i < user.length; i++) {
        const element_i = user[i];
        for (let j = 0; j < cate.length; j++) {
          const element_j = cate[j];
          if (element_i.category_id.toString() == element_j._id.toString()) {
            let obj = {
              description: element_i.description,
              storytitle: element_i.storytitle,
              image: element_i.image,
              category_name: element_j.category_name,
              _id: element_i._id,
              isFeatured: element_i.isFeatured
            };
            all.push(obj);
          }
        }
      }
      return res.json(all);
    } catch (error) {
      console.log(error);
    }
  },
  getFeaturedItems: async function (req, res) {
    try {
      const featuredItems = await story.find({isFeatured: true});
       

      return res.json(featuredItems);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = Topstory;
