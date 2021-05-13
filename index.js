const express = require("express");
require("dotenv").config();
const connectDatabase = require("./config/connection");
const app = express();
const path = require("path");
const cors = require("cors");

app.use(cors());

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const _dirname = path.resolve();
app.use("uploads", express.static(path.join(_dirname, "uploads")));

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
    if (file.mimetype == "image/png" ||file.mimetype == "image/jpg" ||file.mimetype == "image/jpeg") {
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

// auth signUp login ForgetPassword
let auth = require("./routes/auth/admin_authentication");
app.post("/api/register", auth.register);
app.post("/api/login", auth.login);
app.put("/api/forgetpassword", auth.forget_password);
app.put("/api/resetpassword", auth.reset_password);
app.post("/api/guest", auth.Guest);

// image base article CRUD
let imageArticles = require("./routes/ImageArticles/imageArticles");
app.post(
  "/api/create_article",
  upload.single("image"),
  imageArticles.create_article
);
app.post("/api/delete_article", imageArticles.Delete_article);
app.post("/api/update_article", imageArticles.Update_article);
app.get("/api/gets_article", imageArticles.Gets_article);
app.get("/api/get_featured_article", imageArticles.getFeaturedItems);

// Dish CRUD
let topstory = require("./routes/topStroies/topStories");
app.post("/api/create_story", upload.single("image"), topstory.create_story);
app.post("/api/delete_story", topstory.Delete_story);
app.post("/api/update_story", topstory.Update_story);
app.get("/api/gets_story", topstory.Gets_story);
app.get("/ap/get_featured_topstory", imageArticles.getFeaturedItems);

// Dish CRUD
let videoArticle = require("./routes/VideoArticle/VideoArticle");
app.post(
  "/api/create_video",
  upload.single("image"),
  videoArticle.create_video
);
app.post("/api/delete_video", videoArticle.Delete_video);
app.post("/api/update_video", videoArticle.Update_video);
app.get("/api/gets_video", videoArticle.Gets_video);
app.get("/ap/get_featured_topstory", imageArticles.getFeaturedItems);

// Editor CRUD by admin only
let Editor = require("./routes/Editor/Editor");
app.post("/api/editor/add", upload.single("image"), Editor.addEditor);
app.post("/api/editor/delete", Editor.deteleEditor);
app.post("/api/editr/update", Editor.updateEditor);
app.get("/api/editor/get_all", Editor.get_all_Editor);

// Categories
let Categories = require("./routes/Categories/Categories");
app.post("/api/categories/add", upload.single("image"), Categories.addCategory);
app.post("/api/categories/delete", Categories.deteleCategory);
app.post("/api/categories/update", Categories.updateCategory);
app.get("/api/categories/get_all", Categories.get_all_Category);

// Sub-Categories
let SubCategories = require("./routes/SubCategories/SubCategories");
app.post("/api/SubCategories/add", SubCategories.addCategory);
app.post("/api/SubCategories/delete", SubCategories.deteleCategory);
app.post("/api/SubCategories/update", SubCategories.updateCategory);
app.get("/api/SubCategories/get_all", SubCategories.get_all_Category);

// Banners
let Banner = require("./routes/Banner/Banner");
app.post("/api/banner/add", upload.single("image"), Banner.add);
app.post("/api/banner/delete", Banner.detele);
app.post("/api/banner/update", Banner.update);
app.get("/api/banner/get_all", Banner.get_all);

app.use(express.static("./build"));

app.use("*", (req, res) => {
  res.sendfile("./build/index.html");
});

connectDatabase();
const PORT = process.env.PORT || 9090;

app.listen(PORT, function () {
  console.log("server is started on port " + PORT);
});
