import { Router } from "express";
import CartManager from "../managers/cartManager.js";

const router = Router();
const cartManager = new CartManager("./src/data/carts.json");

router.post("/", async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el carrito" });
    }
});

router.post("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params;

    try {
        await cartManager.addProductToCart(parseInt(cid), parseInt(pid));
        res.status(200).json({ message: `Producto ${pid} agregado al carrito ${cid}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
