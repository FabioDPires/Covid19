var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var requestSchema = new Schema({
  paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  encaminhado: {
    type: String,
    required: [true, "encaminhado is a required field"],
    enum: ["Sim", "Não"],
  }, //vem do body
  pessoaRisco: {
    type: String,
    required: [true, "pessoaRisco is a required field"],
    enum: ["Sim", "Não"],
  }, //vem do body
  trabalhoRisco: {
    type: String,
    required: [true, "trabalhoRisco is a required field"],
    enum: ["Sim", "Não"],
  }, //vem do body
  estadoPedido: {
    type: String,
    enum: ["Pendente", "Agendado", "Concluído", "Aguarda Resultado"],
  },
  resultado: { type: String, enum: ["Positivo", "Negativo"] },
  dataExame: { type: Date }, //data tem de ser superior a data atual
});

module.exports = mongoose.model("Request", requestSchema);
