var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  cartaoCidadao: {
    type: String,
    required: [true, "cartaoCidadao is a required field"],
    index: {
      unique: true,
    },
    match: /[0-9]{8}/,
  },
  password: { type: String, required: ["password is a required field"] },
  histórico: [
    {
      type: Schema.Types.ObjectId,
      ref: "Request",
    },
  ],
  role: { type: String },

  estado: { type: String, enum: ["Infetado", "Suspeito", "Curado"] },
});

module.exports = mongoose.model("User", userSchema);
