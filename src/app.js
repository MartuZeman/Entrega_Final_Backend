import express from "express"
import productsRouter from "./routes/products.router.js";
import connectMongoDB from "./config/db.js";
import dotenv from "dotenv";
import cartRouter from "./routes/carts.router.js";
import { engine } from "express-handlebars";
import viewsRouter from "./routes/views.router.js";

dotenv.config();

const app = express();
app.use(express.json()); 
app.use(express.static("public"));

connectMongoDB();

//end points
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter)
app.use('/',viewsRouter)

//config handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")


app.listen(8080, ()=>{
    console.log("servidor iniciado correctamente")
});