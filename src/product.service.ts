
import{Repository} from "typeorm";
import { ProductEntity } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ProductDTO } from "./product.dto";

    @Injectable()
    export class ProductService {
        constructor(
            @InjectRepository(ProductEntity)
            private productRepo: Repository<ProductEntity>
        ) { }
        async getProduct(): Promise<ProductEntity[]> {
            return this.productRepo.find();
        }

        getProductByIDName():any {
            return this.productRepo.find();
        }

        getProductByID(id):any {
            return this.productRepo.findOneBy({ id });
        }

        async addProduct(data: ProductDTO): Promise<ProductEntity> {
            return this.productRepo.save(data);
        }

        updateProduct(name: any , quantity: any, id:string | number):any {
            console.log (name+quantity,id);
            return this.productRepo.update(id,{name:name , quantity:quantity});
        }

        async updateProductById(id: number, data: ProductDTO): Promise<ProductEntity> {
            await this.productRepo.update(id, data);
            return this.productRepo.findOneBy({ id });
        }

        deleteProductbyid(id):any {
    
            return this.productRepo.delete(id);
        }
    }