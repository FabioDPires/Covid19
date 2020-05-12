var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var requestSchema = new Schema({
  paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  encaminhado: {
    type: Boolean,
    required: [true, "encaminhado is a required field"],
  }, //vem do body
  pessoaRisco: {
    type: Boolean,
    required: [true, "pessoaRisco is a required field"],
  }, //vem do body
  trabalhoRisco: {
    type: Boolean,
    required: [true, "trabalhoRisco is a required field"],
  }, //vem do body
  estadoPedido: {
    type: String,
    enum: ["Pendente", "Agendado", "Concluído", "Aguarda Resultado"],
  },
  resultado: { type: String, enum: ["Positivo", "Negativo"] },
  dataExame: { type: String }, //data tem de ser superior a data atual
});

module.exports = mongoose.model("Request", requestSchema);
