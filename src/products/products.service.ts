 import {Injectable, NotFoundException} from "@nestjs/common"

import { Product } from "./product.model"

@Injectable()
export class ProductsService {
	private products: Product[] = [];

	insertProduct(title: string, description: string, price: number) {
		const id = Math.random().toString();
		const newProduct = new Product(id, title, description, price);
		this.products.push(newProduct);
		return id;
	}

	getProducts() {
		return [...this.products];
	}

	getProduct(prodId: string) {
		const [product] = this.findProduct(prodId);
		return {...product};
	}

	updateProduct(id: string, title: string, description: string, price: number) {
		const [product, productIndex] =  this.findProduct(id);
		const updatedProduct = { ...product };
		if(title) {
			updatedProduct.title = title;
		}

		if(description) {
			updatedProduct.description = description;
		}

		if(price) {
			updatedProduct.price = price
		}


		this.products[productIndex] = updatedProduct;
	}

	private findProduct(id: string): [Product, number] {
		const productIndex = this.products.findIndex(prod => prod.id == id)
		const product = this.products[productIndex];
		if (productIndex) {
			return [product, productIndex]
		} else {
			throw new NotFoundException("Product not founded.")
		}
	}
}