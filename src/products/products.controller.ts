import { Controller, Post, Get, Body, Param, Patch, Delete } from "@nestjs/common"
import { ProductsService } from './products.service'


@Controller('products')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}
	
	@Post()
	async addProduct(@Body() entireBody: {
		title: string,
		description: string,
		price: number
	}) {
		const {title, description, price} = entireBody
		const generatedId = await this.productsService.insertProduct(title, description, price);
		return { generatedId };
	}

	@Get()
	async getAllProducts() {
		const products = await this.productsService.getProducts();
		return {
			products: products.map(prod => {
				const obj = { 
					id: prod.id,
					title: prod.title,
					description: prod.description,
					price: prod.price
				} 
				return obj
			})
		}
	}

	@Get(':id')
	getProduct(@Param('id') prodId: string) {
		return this.productsService.getProduct(prodId)
	}

	@Patch(':id')
	async updateProduct(@Param('id') prodId: string, @Body('title') prodTitle: string, @Body('description') prodDesc: string, @Body('price') prodPrice: number) {
		await this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
		return { message: "Product has been updated." };
	}

	@Delete(':id')
	async deleteOneProduct(@Param('id') prodId: string) {
		await this.productsService.removeOneProduct(prodId);
		return { message: "Product deleted."}
	};
}