import fs from "fs";

class CartManager {
    constructor(path) {
        this.path = path;
        this.carts = this.loadCarts();
    }

    loadCarts() {
        try {
            const data = fs.readFileSync(this.path, "utf-8");
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    saveCarts() {
        fs.writeFileSync(this.path, JSON.stringify(this.carts, null, 2));
    }

    async getCartById(id) {
        return this.carts.find(cart => cart.id === id);
    }

    async addProductToCart(cartId, productId) {
        const cart = await this.getCartById(cartId);

        if (!cart) {
            throw new Error("Carrito no encontrado");
        }

        const productIndex = cart.products.findIndex(product => product.id === productId);

        if (productIndex !== -1) {
            cart.products[productIndex].quantity += 1;
        } else {
            cart.products.push({
                id: productId,
                quantity: 1
            });
        }

        this.saveCarts();
    }

    async createCart() {
        const newCartId = this.carts.length ? Math.max(this.carts.map(cart => cart.id)) + 1 : 1;

        const newCart = {
            id: newCartId,
            products: []
        };

        this.carts.push(newCart);
        this.saveCarts();
        return newCart;
    }
}

export default CartManager;
