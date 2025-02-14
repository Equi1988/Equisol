import express from "express";
import productsRouter from "./routes/productsRoutes.js";
import cartsRouter from "./routes/cartsRoutes.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.get("/", (req, res) => {
    res.send("Bienvenido a la API de Productos y Carritos. Usa /api/products o /api/carts");
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
