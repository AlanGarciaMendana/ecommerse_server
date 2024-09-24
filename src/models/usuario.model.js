import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    firstName: String,
lastName: String,
email: {
    type: String,
    required: true,
    unique: true, 
    match: [/\S+@\S+\.\S+/, 'El formato de email es inválido']
  },
age: Number,
password: String,
rol: {
    type: String,
    enum:["admin","user"],
    default: "user",
},
cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' }

})

const usuarioModel = mongoose.model("usuarios", usuarioSchema)

export default usuarioModel