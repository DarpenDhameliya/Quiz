const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './files/category');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|svg|pdf|csv|xlsx/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  if ((mimetype || file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only jpeg, jpg, png, svg, pdf, csv, and xlsx files are allowed.'));
  }
}


const upload = multer({
  storage,
  limits: {
    fileSize: 2000000, // 2MB
  },
  fileFilter: function (_req, file, cb) {
    checkFileType(file, cb);
  },
}).single('image');

module.exports = { upload };
