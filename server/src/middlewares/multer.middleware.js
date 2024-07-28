import multer from "multer";
import path from "path";
// Multer configuration for storing files in a temporary directory
const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, ".../../public/temp");
   },
   filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
   },
});

// File filter to allow only jpg and png files
const fileFilter = (req, file, cb) => {
   const ext = path.extname(file.originalname);
   if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      return cb(new Error("Only .jpg, .jpeg, .png files are allowed"), false);
   }
   cb(null, true);
};

// Multer instance
export const upload = multer({
   storage: storage,
   fileFilter: fileFilter,
   limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
});
