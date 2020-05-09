var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var requestSchema = new Schema({
  paciente: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  encaminhado: { type: String }, //vem do body
  pessoaRisco: { type: String }, //vem do body
  trabalhoRisco: { type: String }, //vem do body
  estadoPedido: { type: String }, //default pendente
  resultado: { type: String }, //vazio , alterado depois
  dataExame: { type: Date },
});

module.exports = mongoose.model("Request", requestSchema);
