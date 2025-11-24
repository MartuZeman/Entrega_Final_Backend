import Cart from "../models/cart.models.js";
import express from "express"

const cartRouter = express.Router();

cartRouter.post("/", async(req, res)=>{
    try {

        const cart = new Cart();
        await cart.save();
        res.status(201).json({status:"success", payload: cart});
        
    } catch (error) {
    res.status(500).send({status: "error", message: error.message}) 
    }
});

cartRouter.post("/:cid/product/:pid", async(req, res)=>{
    try {

        const { cid, pid } = req.params;
        const { quantity = 1 } = req.body || {};
        const updatedCart = await Cart.findByIdAndUpdate(cid, {$push: {products: {product: pid, quantity}}}, {new: true, runValidators: true});
        res.status(200).json({status:"Succes", payload: updatedCart})
    } catch (error) {
        res.status(500).send({status: "error", message: error.message})        
    }
});

cartRouter.get("/:cid", async(req, res)=>{
    try {
        const cid = req.params.cid;

        const cart = await Cart.findById(cid).populate("products.product");

        if(!cart) return res.status(404).json({status:"error", message: error.message})

        res.status(200).json({status:"success", payload: cart.products})
    } catch (error) {
        res.status(500).send({status: "error", message: error.message})         
    }
} );

cartRouter.delete("/:cid/product/:pid", async(req, res)=>{
    try {
        const { cid, pid } = req.params;  
        const cart = await Cart.findById(cid);

        if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });

        cart.products = cart.products.filter((item) => item.product.toString() !== pid);

        await cart.save()

        res.json({message: "Producto eliminado del carrito", cart})


    } catch (error) {
        res.status(500).send({status: "error", message: error.message})            
    }
});


cartRouter.delete("/:cid", async(req, res)=>{
    try {
       const cid = req.params.cid
        const cart = await Cart.findById(cid);

        if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });

        cart.products = [];

        await cart.save()

        res.json({message: "Productos eliminados del carrito", cart})


    } catch (error) {
        res.status(500).send({status: "error", message: error.message})            
    }
});


export default cartRouter