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
  const filetypes = /jpeg|jpg|png|svg|pdf/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE'), false);
  }
}
const upload = multer({
  storage,
  limits: {
    files: 1,
    fileSize: 2000000,
  },
  fileFilter: function (_req, file, cb) {
    checkFileType(file, cb);
  },
}).single('image');
module.exports = { upload };
