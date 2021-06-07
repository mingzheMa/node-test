require("./Admin");
require("./Class");
require("./Book");
require("./Student");

const db = require("./db");
// db.sync({
//   force: true
// });
db.sync();
