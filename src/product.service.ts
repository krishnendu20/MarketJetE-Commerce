
import{Repository} from "typeorm";
import { ProductEntity } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ProductDTO } from "./product.dto";
import { ManagerDTO } from "./manager.dto";
import { ManagerEntity } from "./manager.entity";
import * as bcrypt from 'bcrypt';
import { ManagerUpdateDto } from "./managerupdatedto.dto";


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

        updateProduct(name: string,id: any):any {
            console.log(name+id);
            return this.productRepo.update(id,{name:name});
            }
            updateProductbyid(mydto:ManagerUpdateDto,id):any {
            return this.productRepo.update(id,mydto);
               }
    
    
        addProduct(mydto:ProductDTO):any {
            const productaccount = new ProductEntity()
            productaccount.name = mydto.name;
            productaccount.quantity = mydto.quantity;
            productaccount.price = mydto.price;
            productaccount.filename = mydto.filename;
           return this.productRepo.save(productaccount);
              }
        
         
        
            //   async addproduct(mydto) {
            //     const salt = await bcrypt.genSalt();
            //     const hassedpassed = await bcrypt.hash(mydto.password, salt);
            //     mydto.password= hassedpassed;
            //     return this.productRepo.save(mydto);
            //     }
        
        deleteProductbyid(id):any {
    
            return this.productRepo.delete(id);
        }
    }