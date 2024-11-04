const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  type: {
    type: String,
    enum:["refresh","access"]
  },
  token: {
    type: String,
  },
 

});

const Token = mongoose.model("token", tokenSchema, "tokens");
module.exports = Token;
