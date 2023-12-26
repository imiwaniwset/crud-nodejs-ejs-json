const router = require("express").Router();
const employeeController = require("../controller/Controller");
const multer = require("multer");
const path = require("path");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, path.join(__dirname, "../uploads"));
    } else {
      cb(new Error("Invalid file type"), null);
    }
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

let upload = multer({
  storage: storage,
}).single("image");

router.get("/", employeeController.showEmployee);
router.get("/add", employeeController.addFormStudent);
router.post("/add", upload, employeeController.addStudent);
router.get("/:id/delete", employeeController.deleteEmployee);
router.get("/:id/edit", employeeController.editForm);
router.post("/:id/edit", upload, employeeController.editData);

router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(400).send("File upload error: " + err.message);
  } else if (err) {
    res.status(500).send("Internal Server Error");
  } else {
    next();
  }
});
module.exports = router;
