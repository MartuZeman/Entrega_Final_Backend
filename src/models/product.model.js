import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import  paginate  from "mongoose-paginate-v2";

const productsSchema = new mongoose.Schema({
    title: String,
    description: {type: String, index: "text"}, 
    thumbnail:{type: String, default:""},
    code: {type: String, unique: true},
    price: Number,
    stock: Number,
    category: {type: String, index: true},
    status: {
        type: Boolean,
        default: true,
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

productsSchema.plugin(paginate);

const Products = mongoose.model("Products", productsSchema);

export default Products