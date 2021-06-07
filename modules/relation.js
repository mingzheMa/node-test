const Class = require("./Class");
const Student = require("./Student");

Class.hasMany(Student, {
  foreignKey: {
    name: "class_id",
    allowNull: true
  }
});
Student.belongsTo(Class, {
  foreignKey: {
    name: "class_id",
    allowNull: false
  }
});
