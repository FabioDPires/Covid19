var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  cartaoCidadao: {
    type: String,
    require: [true, "cartaoCidadao is a required path"],
    Index: true,
    unique: true,
    match: /^[0-9]{8}$/,
  },
  password: {
    type: String,
    required: ["password is a required field"],
  },
  role: { type: String, enum: ["Admin", "Technical", "User"] },

  estado: { type: String, enum: ["Infetado", "Suspeito", "Não Infetado"] },
});

module.exports = mongoose.model("User", userSchema);
