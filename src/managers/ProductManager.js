import fs from 'fs';

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.products = this.loadProducts();
    }

    loadProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const data = fs.readFileSync(this.path, 'utf-8');
                return JSON.parse(data);
            } else {
                return [];
            }
        } catch (error) {
            console.error("Error al cargar productos:", error);
            return [];
        }
    }

    saveProducts() {
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
    }

    getNextId() {
        if (this.products.length === 0) return 1;
        return this.products[this.products.length - 1].id + 1;
    }

    addProduct({ title, description, code, price, status, stock, category, thumbnails }) {
        const newProduct = {
            id: this.getNextId(),
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails
        };

        this.products.push(newProduct);
        this.saveProducts();
        return newProduct;
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        return this.products.find(prod => prod.id === parseInt(id, 10));
    }

    updateProduct(id, updatedFields) {
        const index = this.products.findIndex(prod => prod.id === parseInt(id, 10));
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updatedFields, id: parseInt(id, 10) };
            this.saveProducts();
            return this.products[index];
        } else {
            return null;
        }
    }

    deleteProduct(id) {
        const index = this.products.findIndex(prod => prod.id === parseInt(id, 10));
        if (index !== -1) {
            this.products.splice(index, 1);
            this.saveProducts();
            return true;
        } else {
            return false;
        }
    }
}

export default ProductManager;
