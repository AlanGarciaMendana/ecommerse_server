import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
firstName: String,
lastName: String,
email: {
    type: String,
    unique: true, 
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

const userModel = mongoose.model("usuarios", userSchema)

export default userModel