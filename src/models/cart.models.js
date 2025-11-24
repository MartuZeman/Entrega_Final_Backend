import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({

products:{
    type: [
        {
            product:{type: mongoose.Schema.Types.ObjectId, ref: "Products"},
            quantity:{type: Number}
        }
    ],
    default: []
},
createsAt:{type: Date, default: Date.now}

});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;