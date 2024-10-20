import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"


const productsCollection = "products"

const productsSchema = new mongoose.Schema({

    title:String,
    description: String,
    code:{type:String,
        unique:true},
    price:{ 
        type:Number,
        index:true},
    status: Boolean,
    stock: Number,
    category:{type:String,
        index:true,
    }
})

productsSchema.plugin(mongoosePaginate)


const ProductsModel = mongoose.model(productsCollection, productsSchema)

export default ProductsModel