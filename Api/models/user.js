var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  cartaoCidadao: { type: String},
  password: { type: String },
  role: { type: String },
});

module.exports = mongoose.model("User", userSchema);
