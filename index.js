const express = require("express");
require("dotenv").config();
const connectDatabase = require("./DB/connection");
const app = express();
const path = require("path");
const cors = require("cors");

app.use(cors());

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const _dirname = path.resolve();
app.use("uploads", express.static(path.join(_dirname, "uploads")));

// auth signUp login ForgetPassword
let auth = require("./auth/admin_authentication");
app.post("/api/register", auth.register);
app.post("/api/login", auth.login);
app.put("/api/forgetpassword", auth.forget_password);
app.put("/api/resetpassword", auth.reset_password);
app.post("/api/guest", auth.Guest);

// const path = require("path");
const multer = require("multer");

// const _dirname = path.resolve()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${file.originalname
        .toLowerCase()
        .split(" ")
        .join("_")}`
    );
  },
});
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});
// const upload = multer({
//   storage
// })

app.use("/api/uploads", express.static(path.join(_dirname, "uploads")));

// image base article CRUD

let imageArticles = require("./ImageArticles/imageArticles");
app.post(
  "/api/create_article",
  upload.single("image"),
  imageArticles.create_article
);
app.post("/api/delete_article", imageArticles.Delete_article);
app.post("/api/update_article", imageArticles.Update_article);
app.get("/api/gets_article", imageArticles.Gets_article);

// Dish CRUD
let topstory = require("./topStroies/topStories");
app.post("/api/create_story", upload.single("image"), topstory.create_story);
app.post("/api/delete_story", topstory.Delete_story);
app.post("/api/update_story", topstory.Update_story);
app.get("/api/gets_story", topstory.Gets_story);

// Editor CRUD by admin only
let Editor = require("./Editor/Editor");
app.post("/api/editor/add", upload.single("image"), Editor.addEditor);
app.post("/api/editor/delete", Editor.deteleEditor);
app.post("/api/editr/update", Editor.updateEditor);
app.get("/api/editor/get_all", Editor.get_all_Editor);


app.use(express.static('./build'))

app.use('*', (req, res) => {

    res.sendfile('./build/index.html');

});


connectDatabase();
const PORT = process.env.PORT || 9090;

app.listen(PORT, function () {
  console.log("server is started on port " + PORT);
});
