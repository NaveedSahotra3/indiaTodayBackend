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
    if (
      // file.mimetype == "image/png" ||
      // file.mimetype == "image/jpg" ||
      // file.mimetype == "image/jpeg" ||      
      // file.mimetype == "video/webm" ||
      // file.mimetype == "video/mp4" ||
      // file.mimetype == "video/mav" 

      file
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      // return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
      return cb(new Error("File is required"));
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
app.post("/api/get_profile", auth.getProfile);

// image base article CRUD

// Team Member
let TeamMember = require("./routes/teamMember/teamMember");


app.post( "/api/create_article", upload.single("image"),  TeamMember.create_article);
app.post("/api/delete_article", TeamMember.Delete_article);
app.post("/api/update_team",  upload.single("image"), TeamMember.Update_team);
app.get("/api/gets_article", TeamMember.Gets_article);
app.get("/api/get_featured_article", TeamMember.getFeaturedItems);
app.post("/api/get_one_article", TeamMember.getOneArticle);
app.post("/api/get_articles_by_category", TeamMember.getCategoryArticles);


// AboutCrud
let AboutCrud = require("./routes/aboutCrud/aboutCrud");
app.post("/api/create_story", AboutCrud.create_AboutCrud);
app.post("/api/delete_story", AboutCrud.Delete_AboutCrud);
app.post("/api/update_aboutcrud", upload.single("image"),  AboutCrud.Update_AboutCrud);
app.get("/api/gets_aboutcrud", AboutCrud.Gets_AboutCrud);
app.post("/api/getone_aboutcrud", AboutCrud.GetOne_AboutCrud);



// Video Crud
let videoArticle = require("./routes/VideoArticle/VideoArticle");
app.post(
  "/api/create_video",
 
  videoArticle.create_video
);
app.post("/api/delete_video", videoArticle.Delete_video);
app.post("/api/update_video",upload.single("image"),  videoArticle.Update_video);
app.get("/api/gets_video", videoArticle.Gets_video);
app.post("/api/get_one_video", videoArticle.Get_one_video);



// Talkshow

let Talkshow = require('./routes/talkshow/Talkshow')

app.post("/api/talkshow/add", upload.single("image"), Talkshow.Create);
app.post("/api/talkshow/update", upload.single("image"), Talkshow.Update);

app.post("/api/talkshow/delete" , Talkshow.Delete_TalkShow)
app.get("/api/talkshow/get" , Talkshow.Gets_talkshows)

// Magzine

let Magzine = require('./routes/magzine/Magzine')
app.post("/api/magzine/add", upload.single("image"), Magzine.Create);
app.post("/api/magzine/update", upload.single("image"), Magzine.Update_magzine);

app.get("/api/magzine/get" , Magzine.Gets_Magzines)
app.post("/api/magzine/delete" , Magzine.Delete_Magzine)




// Gallery

let Gallery = require("./routes/gallery/gallery")

app.post("/api/gallery/create" , upload.single("image") , Gallery.create_gallery)

app.post("/api/gallery/update" , upload.single("image") , Gallery.update_gallery)

app.post("/api/gallery/delete", Gallery.delete_gallery)

app.get("/api/gallery/gets"  , Gallery.gets_gallery)










app.use(express.static("./build"));

app.use("*", (req, res) => {
  res.sendfile("./build/index.html");
});

connectDatabase();
const PORT = process.env.PORT || 9090;

app.listen(PORT, function () {
  console.log("server is started on port " + PORT);
});
