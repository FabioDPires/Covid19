var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var requestSchema = new Schema({
  user: { type: User },
  encaminhado: { type: String },
  pessoaRisco: { type: String },
  trabalhoRisco: { type: String },
  estadoPedido: { type: String },
  resultado: { type: String },
});

module.exports = mongoose.model("Request", requestSchema);
