var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var requestSchema = new Schema({
  paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "paciente is a required field"],
  },
  encaminhado: {
    type: Boolean,
    default: false,
  }, //vem do body
  pessoaRisco: {
    type: Boolean,
    default: false,
  }, //vem do body
  trabalhoRisco: {
    type: Boolean,
    default: false,
  }, //vem do body
  estadoPedido: {
    type: String,
    enum: ["Pendente", "Agendado", "Concluído", "Anulado"],
  },
  resultado: { type: String, enum: ["Positivo", "Negativo"] },
  dataExame: {
    type: Date,
  },
  dataFormatada: {
    type: String,
  },
  mes: {
    type: Number,
  },
  prioridade: { type: Number },
});

module.exports = mongoose.model("Request", requestSchema);
