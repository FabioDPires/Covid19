var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  cartaoCidadao: {
    type: String,
    require: [true, "É obrigatório indicar o cartão de cidadão"],
    Index: true,
    unique: true,
    match: /^[0-9]{8}$/,
  },
  password: {
    type: String,
    required: ["É obrigatório indicar a password"],
  },
  role: { type: String, enum: ["Admin", "Technical", "User"] },

  estado: { type: String, enum: ["Infetado", "Suspeito", "Não Infetado"] },
  sexo: {
    type: String,
    enum: ["Masculino", "Feminino"],
    require: [true, "É obrigatório indicar o sexo"],
  },
  idade: {
    type: Number,
    require: [true, "É obrigatório indicar a idade"],
  },
  faixaEtaria: {
    type: String,
    enum: ["Criança", "Adolescente", "Adulto", "Idoso"],
  },
});

module.exports = mongoose.model("User", userSchema);
