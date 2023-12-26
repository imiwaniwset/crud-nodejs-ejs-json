const router = require("express").Router();
const studentRoute = require("./EmployeeRoute");

router.get("/", (req, res) => {
  res.send("ini dari index router");
});
router.use("/employee", studentRoute);

// console.log(router);
module.exports = router;
