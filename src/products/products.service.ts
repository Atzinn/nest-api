import {Injectable, NotFoundException} from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from "./product.model"

@Injectable()
export class ProductsService {
	constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

	async insertProduct(title: string, description: string, price: number) {
		const newProduct = new this.productModel({
			title,
			description,
			price
		});
		const res = await newProduct.save();
		return res.id as string;
	}

	async getProducts() {
		const products = await this.productModel.find().exec();
		return products as Product[];
	}

	async getProduct(prodId: string) {
		const product = await this.findProduct(prodId);
		const productFromDB = {
			id: product.id,
			title: product.title,
			description: product.description,
			price: product.price
		}
		return productFromDB;
	}

	async updateProduct(id: string, title: string, description: string, price: number) {
		const updatedProduct = await this.findProduct(id);

		if(title) {
			updatedProduct.title = title;
		}

		if(description) {
			updatedProduct.description = description;
		}

		if(price) {
			updatedProduct.price = price
		}

		updatedProduct.save();
	}

	async removeOneProduct(id: string) {
		const result = await this.productModel.findOneAndDelete({_id: id}).exec();
		if(result === null) {
			throw new NotFoundException("Product not founded.")
		}
	}

	private async findProduct(id: string): Promise<Product> {
		let product;
		
		try {
			product = await this.productModel.findById(id);
		} catch(exec) {
			throw new NotFoundException("Product not founded.")
		}

		return product;
	}
}