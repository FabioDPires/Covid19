var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  cartaoCidadao: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  password: { type: String },
  role: { type: String },
});

module.exports = mongoose.model("User", userSchema);
