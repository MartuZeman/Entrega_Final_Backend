import express from "express";
import Products from "../models/product.model.js";

const productsRouter = express.Router();

productsRouter.get("/", async (req, res) => {
  try {

    const {limit=10, page=1} = req.query;
    const data = await Products.paginate({}, {limit, page});
    const products = data.docs;
    delete data.docs
    res.status(200).json({ status: "Success", payload: products, ...data });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "Error al recuperar los productos" });
  }
});

productsRouter.get("/:pid", async (req, res) => {
  try {

    const pid = req.params.pid

    const product = await Products.findById(pid)
    

    res.status(200).json({ status: "Success", payload: product});
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "Error al recuperar los productos" });
  }
});

productsRouter.post("/", async (req, res) => {
  try {
    const newProduct = req.body;

    const product = new Products(newProduct);

    await product.save();

    res.status(201).json({ status: "Success", payload: product });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "Error al agregar el producto" });
  }
});

productsRouter.put("/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;

    const updates = req.body;

    const updatedProduct = await Products.findByIdAndUpdate(pid, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct)
      return res
        .status(404)
        .json({ status: "error", message: "Producto no encontrado" });

    res.status(200).json({ status: "Success", payload: updatedProduct });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "Error al actualizar el producto" });
  }
});

productsRouter.delete("/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;

    const deletedProduct = await Products.findByIdAndDelete(pid);

    if (!deletedProduct)
      return res
        .status(404)
        .json({ status: "error", message: "Producto no encontrado" });

    res.status(200).json({ status: "Success", payload: deletedProduct });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "Error al borrar el producto" });
  }
});

export default productsRouter;
