 
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const EditorSchema = require("../../Models/register_schema");
const admin = require("../../Models/register_schema");

const Editor = {
  addEditor: async function (req, res) {
    console.log(req.body)
    try {
      let newEditorStatus = null
      let newAdminStatus = null
      let { name, email, password, admin_id , isEditor } = req.body;
      let image;
    //  isEditor == 'true' ? newEditorStatus = true : false
    if(isEditor== 'true'){
      newEditorStatus = true
      newAdminStatus = false
    }
    else{
      newEditorStatus = false
      newAdminStatus = true

    }

      if (req.file) image = `${req.file.fieldname}-${req.file.originalname}`;
      if (!email || !password) {
        return res.send("Must include email and password");
      }
      // Check editor is added by admin

      let getAdmin = await admin.findOne({ _id: admin_id });
      if (!getAdmin)
        throw res.status(400).json({ msg: "You are not a Admin." });

      // If Editor already exist
      let getEditor = await EditorSchema.findOne({ email });
      if (getEditor)
        throw res.status(400).json({ msg: "Email is already registred." });

      // The data is valid and new we can register the user
      let newEditor = new EditorSchema({
        name,
        password,
        email,
        image,
        isEditor : newEditorStatus,
        isAdmin : newAdminStatus
      });
      console.log(newEditor)

      // Hash the password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newEditor.password, salt, (err, hash) => {
          if (err) throw err;
          newEditor.password = hash;
          newEditor.save().then((user) => {
            console.log(user)
            return res.status(201).json({
              success: true,
              msg: "Hurry! editor is now registered.",
            });
          });
        });
      });
    } catch (err) {
      return res.status(err.status || 500).send(err.message);
    }
  },

  deteleEditor: async function (req, res) {
    try {
      console.log(req.body);
      let { editor_id, admin_id } = req.body;
      // Check this is admin

      let getAdmin = await admin.findOne({ _id: admin_id });
      if (!getAdmin)
        throw res.status(400).json({ msg: "You are not a Admin." });

      let editor = await EditorSchema.findById({ _id: editor_id });
      if (!editor) throw res.status(400).json({ msg: "Editor Not found." });

      let deleted = await editor.delete();

      return res.status(201).json({
        success: true,
        msg: "Successfully Deleted",
      });
    } catch (err) {
      return res.status(err.status || 500).send(err.message);
    }
  },

  updateEditor: async function (req, res) {
    try {
      let data = Object.assign({}, req.body);

      let editor_id = data.editor_id;
      let admin_id = data.admin_id;

      // Check editor is added by admin

      let getAdmin = await admin.findOne({ _id: admin_id });
      if (!getAdmin)
        throw res.status(400).json({ msg: "You are not a Admin." });

      let editor = await EditorSchema.findById({ _id: editor_id });
      if (!editor) throw res.status(400).json({ msg: "Editor Not found." });

      data.admin_id.remove();
      data.editor_id.remove();
      let update = await EditorSchema.findOneAndUpdate(
        { _id: editor_id },
        { ...data },
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
    } catch (err) {}
  },

  get_all_Editor: async function (req, res) {
    try {
      const user = await EditorSchema.find();
      res.json(user);
    } catch (error) {
      console.log(error);
    }
  },
  login: function (req, res) {
    EditorSchema.findOne({ email: req.body.email }, function (err, user) {
      if (err) return res.status(500).send("Error on the server.");
      if (!user) return res.status(404).send("No user found.");

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid)
        return res.status(401).send({ auth: false, token: null });

      var token = jwt.sign({ id: user._id }, "kjdfadskjhkjkhfnf", {
        expiresIn: 86400, // expires in 24 hours
      });

      res.status(200).send({ auth: true, token: token, user });
    });
  },
};

module.exports = Editor;
