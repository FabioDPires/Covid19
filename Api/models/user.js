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
  histórico: [
    {
      type: Schema.Types.ObjectId,
      ref: "Request",
    },
  ],
  role: { type: String },

  estado: { type: String, enum: ["Infetado", "Suspeito", "Curado"] },

  //ARRAY COM TESTES
});

module.exports = mongoose.model("User", userSchema);
