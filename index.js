var express = require('express');
var cors = require('cors');
require('dotenv').config()

var app = express();
const multer = require('multer');
const upload = multer({ des: '/public/storage' })

app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", upload.single('upfile'), (req, res) => { 
  const { originalname, mimetype, size } = req.file;
  res.json({ name: originalname, type: mimetype, size: size });
  
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
