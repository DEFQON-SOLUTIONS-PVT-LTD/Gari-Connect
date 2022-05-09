
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
//const expressValidator = require('express-validator')
var multer = require('multer');
const { successResponse, errorResponse } = require('./app/common/response');

const db = require('./app/config/db.config.js');
const UserDocs = db.UserDocuments;
// force: true will drop the table if it already exists
// db.sequelize.sync().then(() => {
//   console.log('Drop and Resync with { force: true }');
// });

let router = require('./app/routers/router.js');

const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
//app.use(expressValidator())
app.use(bodyParser.json());
app.use('/', router);



// Create a Server
const server = app.listen(8080, function () {

  let host = server.address().address
  let port = server.address().port

  console.log("App listening at http://%s:%s", host, port);
})

// For Single_Upload
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
var upload = multer({ storage: storage });
app.post('/api/uploaduserdoc', upload.single('image'), (req, res) => {
  let userdocs = {};
  const file = req.file.destination + req.file.filename;
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return (error)
  }

  if (file) {
    userdocs.path = file;
    userdocs.userId = req.body.userId;
    userdocs.document_type = req.body.document_type;

    UserDocs.create(userdocs).then(result => {
      // send uploading message to client
      res.status(200).json({
        message: "User Document uploaded successfully!",
        userdocs: successResponse(result),
      });
    });
  }
});
// For Single_UploadImage
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './app/Images/Main_Image/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
var upload = multer({ storage: storage });
app.post('/api/upload-single', upload.single('image'), (req, res) => {
  const file = req.file.destination + req.file.filename;
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return (error)
  }
  res.status(500).json({
    FilePath: file,
    message: "File Uploaded",
  });
});
// For multiple UploadImage
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './app/Images/VehicleImages/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
var upload = multer({ storage: storage });
app.post("/api/multiupload", upload.array("images", 12), (req, res) => {
  try {
    //await multiupload(req, res);
    console.log(req.files);
    if (req.files.length <= 0) {
      return res.send(`You must select at least 1 file.`);
    }
    //const file = req.files.destination[0] + req.files.filename[0];
    let photoArray = [];
    for (var i = 0; i < req.files.length; i++) {
      photoArray[i].push() = req.files.destination[i] + req.files.filename[i];
    }
    res.status(500).json({
      FilePath: photoArray[i],
      message: "File Uploaded",
    });
  } catch (error) {
    console.log(error);
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.send("Too many files to upload.");
    }
    return res.send(`Error when trying upload many files: ${error}`);
  }
});
