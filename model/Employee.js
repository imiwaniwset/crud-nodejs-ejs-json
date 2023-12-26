// const { log } = require("console");
const fs = require("fs");

class Employee {
  constructor(id, image, nama, tahun_masuk, jabatan, gaji) {
    this.id = id;
    this.image = image;
    this.nama = nama;
    this.tahun_masuk = tahun_masuk;
    this.jabatan = jabatan;
    // this.gaji = gaji;
  }
}
class EmployeeModel {
  static showAll(cb) {
    fs.readFile("./employees.json", "utf-8", (err, res) => {
      if (err) {
        cb(err, null);
      } else {
        res = JSON.parse(res);
        const employees = res.map(
          (item) =>
            new Employee(
              item.id,
              item.image,
              item.nama,
              item.tahun_masuk,
              item.jabatan
              // item.gaji
            )
        );
        cb(null, employees);
      }
    });
  }

  static saveData(data, cb) {
    fs.writeFile("./employees.json", JSON.stringify(data, null, 2), (err) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, "New employee has been added");
      }
    });
  }
  static addEmployee(objEmployee, cb) {
    EmployeeModel.showAll((err, data) => {
      if (err) {
        cb(err, null);
      } else {
        let id;
        if (data.length <= 0) {
          id = 1;
        } else {
          id = data[data.length - 1].id + 1;
        }
        objEmployee = new Employee(
          id,
          objEmployee.image,
          objEmployee.nama,
          objEmployee.tahun_masuk,
          objEmployee.jabatan
          // objEmployee.gaji
        );
        data.push(objEmployee);
        console.log(objEmployee, "ini dari model");
        EmployeeModel.saveData(data, (err, data2) => {
          if (err) {
            cb(err);
          } else {
            cb(null, data);
          }
        });
      }
    });
  }

  static deleteEmployee(id, cb) {
    EmployeeModel.showAll((err, data) => {
      if (err) {
        cb(err, null);
      } else {
        data = data.filter((item) => item.id !== parseInt(id));
        EmployeeModel.saveData(data, (err, data2) => {
          if (err) {
            cb(err);
          } else {
            cb(null, data);
          }
        });
      }
    });
  }

  static findByid(id, cb) {
    EmployeeModel.showAll((err, employee) => {
      if (err) {
        cb(err, null);
      } else {
        const employees = employee.find((item) => item.id === id);
        // console.log(employees, "dari model");
        cb(null, employees);
      }
    });
  }

  static updateEmployee(employees, cb) {
    EmployeeModel.showAll((err, data) => {
      if (err) {
        cb(err, null);
      } else {
        for (let i = 0; i < data.length; i++) {
          if (data[i].id === employees.id) {
            data[i].image = employees.image;
            data[i].nama = employees.nama;
            data[i].tahun_masuk = employees.tahun_masuk;
            data[i].jabatan = employees.jabatan;
            // data[i].gaji = employees.gaji;
          }
        }
        EmployeeModel.saveData(data, (err, data2) => {
          if (err) {
            cb(err, null);
          } else {
            cb(null, data2);
          }
        });
      }
    });
  }
}

module.exports = EmployeeModel;
