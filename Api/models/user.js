var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  cartaoCidadao: {
    type: Number,
    require: [true, "cartaoCidadao is a required path"],
    Index: true,
    unique: true,
    min: [8, "cartaoCidadao must have exactly 8 numbers"],
    max: [8, "cartaoCidadao must have exactly 8 numbers"],
  },
  password: {
    type: String,
    required: ["password is a required field"],
    min: 8,
  },
  role: { type: String, enum: ["Admin", "Technical", "User"] },

  estado: { type: String, enum: ["Infetado", "Suspeito", "Não Infetado"] },
});

module.exports = mongoose.model("User", userSchema);
