import { Controller, Post, Get, Body, Param, Patch, Delete } from "@nestjs/common"
import { ProductsService } from './products.service'


@Controller('products')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}
	
	@Post()
	addProduct(@Body() entireBody: {
		title: string,
		description: string,
		price: number
	}) {
		const {title, description, price} = entireBody
		const generatedId = this.productsService.insertProduct(title, description, price);
		return { id: generatedId };
	}

	@Get()
	getAllProducts() {
		return {products: this.productsService.getProducts()};
	}

	@Get(':id')
	getProduct(@Param('id') prodId: string) {
		return this.productsService.getProduct(prodId)
	}

	@Patch(':id')
	updateProduct(@Param('id') prodId: string, @Body('title') prodTitle: string, @Body('description') prodDesc: string, @Body('price') prodPrice: number) {
		this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
		return null;
	}

	@Delete(':id')
	deleteOneProduct(@Param('id') prodId: string) {
		this.productsService.removeOneProduct(prodId);
		return null;
	}

	@Delete()
	clearListOfProducts() {
		this.productsService.clearListOfProducts();
		return null;
	}
}