var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  cartaoCidadao: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
    match: /[0-9]{8}/,
  },
  password: { type: String, required: true },
  role: { type: String },
  
  estado: { type: String, enum: ["Infetado", "Suspeito"] },
});

module.exports = mongoose.model("User", userSchema);
