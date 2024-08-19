import mongoose from "mongoose";

const cartsCollection = "carts"

const cartsSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
                required: true,
            },
            quantity: {
                type: Number,
                require:true,
            }
        }
    ]
})

const CartsModel = mongoose.model(cartsCollection, cartsSchema)

export default CartsModel