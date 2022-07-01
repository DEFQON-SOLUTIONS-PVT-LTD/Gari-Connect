
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
const { successResponse, errorResponse } = require('./app/common/response');
const db = require('./app/config/db.config.js');
const { saveVehicleImagesValidation, updateVehicleImagesValidation } = require('./app/validations/validation');
const VehicleImages = db.vehicle_images;
const UserDocs = db.UserDocuments;
var Buffer = require('buffer/').Buffer;

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
const server = app.listen(process.env.PORT || 8080, function () {

  let host = server.address().address
  let port = server.address().port

  console.log("App listening at http://%s:%s", host, port);
})

// For Single_Upload_Doc
var storage = multer.memoryStorage()
var upload = multer({ storage: storage })
//var upload = multer({ storage: storage });
app.post('/api/uploaduserdoc', upload.single('file'), function (req, res) {
  let userdocs = {};
  const img = req.file.originalname;
  //const path = './app/files/user/documents/';
  // const filepath = path + img;
  const base64Data = new Buffer(JSON.stringify(img)).toString("base64");
  // let buff = new Buffer(base64Data, 'base64');
  // let decode = buff.toString('ascii');
  if (!base64Data) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return (error)
  }
  if (base64Data) {
    userdocs.path = base64Data;
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
// For Single_UploadProfile
var upload = multer({ storage: storage });
app.post('/api/upload-profile', upload.single('image'), (req, res) => {
  const file = req.file.destination + req.file.filename;
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return (error)
  }
  res.status(500).json({
    FilePath: file,
    message: "Profile Uploaded",
  });
});
// For Single_UploadImage
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './app/files/vehicle/images/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
var upload = multer({ storage: storage });
app.post('/api/upload-images', upload.single('image_path'), (req, res) => {
  const { error } = saveVehicleImagesValidation(req.body);
  if (error) return res.status(400).send(errorResponse(error.details[0].message, {}));
  let images = {};
  const file = req.file.destination + req.file.filename;
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return (error)
  }
  if (file) {
    images.image_path = file;
    images.vehicleId = req.body.vehicleId;
    images.document_type = req.body.document_type;
    images.IsDeleted = "0";
    VehicleImages.create(images).then(result => {
      // send uploading message to client
      res.status(200).json({
        message: "Vehicle Image uploaded successfully!",
        userdocs: successResponse(result),
      });
    });
  }
  // res.status(500).json({
  // FilePath: file,
  // message: "File Uploaded",
  // });
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
app.post("/api/multiupload", upload.array("image_path", 12), (req, res) => {
  const { error } = saveVehicleImagesValidation(req.body);
  if (error) return res.status(400).send(errorResponse(error.details[0].message, {}));
  let images = {};
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
    if (photoArray) {
      images.image_path = photoArray[i];
      images.vehicleId = req.body.vehicleId;
      images.document_type = req.body.document_type;
      images.IsDeleted = "0";
      VehicleImages.create(images).then(result => {
        // send uploading message to client
        res.status(200).json({
          message: "Vehicle Image uploaded successfully!",
          userdocs: successResponse(result),
        });
      });
    }
    // res.status(500).json({
    // FilePath: photoArray[i],
    // message: "File Uploaded",
    // });
  } catch (error) {
    console.log(error);
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.send("Too many files to upload.");
    }
    return res.send(`Error when trying upload many files: ${error}`);
  }
});
