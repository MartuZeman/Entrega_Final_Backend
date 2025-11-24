import express, { text } from "express"
import Products from "../models/product.model.js"
import Cart from "../models/cart.models.js";

const viewsRouter = express.Router();

viewsRouter.get("/", async(req, res)=>{

try {
    const{limit=9, page=1, query=null, sort=null}= req.query;
    let filter = {}

    if(query){
        filter = {
            $or:[
                {category: query},
                {title: {$regex:query, $options: "i"}}
            ]
        }
    }

    let sortConfig = {};

    if (sort){
        const [field, direction]= sort.split(":")
        sortConfig[field] = direction === "desc"? -1 : 1;

    }

    const data = await Products.paginate(filter,{limit,page, sort: sortConfig ,lean:true});
    const products = data.docs
    delete data.docs

    const links = []

    for(let index = 1; index<= data.totalPages; index++){
        links.push({text: index, link:`?limit=${limit}&page=${index}`})
    }

    res.render("home", {products, links})
} catch (error) {
    res.status(500).json({status:"error", message: error.message})
}
    
})

viewsRouter.get("/cart/:cid", async(req,res)=>{
    try {

        const cid = req.params.cid;

        const cart = await Cart.findById(cid).populate("products.product").lean();

        if (!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });


        res.render("cart", { cartProducts: cart.products })
    } catch (error) {
        res.status(500).json({status:"error", message: error.message})  
    }
})



export default viewsRouter