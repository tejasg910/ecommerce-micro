import { Controller, Post, Get, Body, UseGuards, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { JwtAuthGuard } from 'src/guards/AuthGuard';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @UseGuards(JwtAuthGuard)
  @Post("create")
  async create(@Body() dto: CreateProductDto) {

    console.log(dto, 'this isdto')
    // return dto;
    return this.productService.createProduct(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  async update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productService.updateProduct(id, dto);
  }


  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async delete(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }

  @Get("get")
  async findAll() {
    return this.productService.findAll();
  }
}
