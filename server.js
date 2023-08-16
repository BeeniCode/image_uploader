const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");

const app = express();
const PORT = 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads");
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + "-" + Date.now());
  },
});
const upload = multer({ storage: storage }).single("userPhoto");

app.post("/upload", function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.json({ Error: err });
    }
    res.send("File is uploaded");
  });
});

app.listen(PORT, function () {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
