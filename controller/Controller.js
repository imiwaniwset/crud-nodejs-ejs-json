const Model = require("../model/Employee");

class Controller {
  static showEmployee(req, res) {
    Model.showAll((err, employees) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(employees, "dari controller");
        res.render("employee", { employees });
      }
    });
  }

  static addFormStudent(req, res) {
    res.render("addForm");
  }

  static addStudent(req, res) {
    let { nama, tahun_masuk, jabatan } = req.body;
    let image = req.file.filename;
    let objEmployee = { image, nama, tahun_masuk, jabatan };
    console.log(objEmployee, "ini object employee");
    Model.addEmployee(objEmployee, (err, data) => {
      if (err) {
        res.send(err);
      } else {
        // res.send(data);
        res.redirect("/employee");
      }
    });
  }

  static deleteEmployee(req, res) {
    let id = req.params.id;
    // console.log(id);
    Model.deleteEmployee(id, (err, data) => {
      if (err) {
        res.send(err, null);
      } else {
        res.redirect("/employee");
      }
    });
  }

  static editForm(req, res) {
    let id = parseInt(req.params.id);
    // console.log(id);
    Model.findByid(id, (err, employees) => {
      // console.log(employees, "ini dari controller");
      if (err) {
        res.send(err);
      } else {
        // res.send(employees);
        res.render("updateForm", { employees });
      }
    });
  }

  static editData(req, res) {
    // let image = req.file.filename;
    console.log(req.body);
    let employees = {
      id: parseInt(req.params.id),
      image: req.file.filename,
      nama: req.body.nama,
      tahun_masuk: req.body.tahun_masuk,
      jabatan: req.body.jabatan,
    };
    console.log(employees);
    Model.updateEmployee(employees, (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.redirect("/employee");
      }
    });
  }
}

module.exports = Controller;
