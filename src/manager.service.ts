import { Injectable } from '@nestjs/common';
import { ManagerDTO } from './manager.dto'
import {ManagerUpdateDto} from "./managerupdatedto.dto"

import {InjectRepository} from "@nestjs/typeorm";
import { ManagerController } from './manager.controller';
import { ManagerEntity } from './manager.entity';
import{Repository} from "typeorm";
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';

    @Injectable()
    export class ManagerService {
        constructor(
            @InjectRepository(ManagerEntity)
            private managerRepo: Repository<ManagerEntity>,
            private mailerService: MailerService
        ) { }
        async getIndex(): Promise<ManagerEntity[]> {
            return this.managerRepo.find();
        }

        async getAdminById(id: number): Promise<ManagerEntity> {
      
          return this.managerRepo.findOneBy({ id});
      
      }

      async getAdminbyIDAndName(id, name): Promise<ManagerEntity> {
        return this.managerRepo.findOneBy({ id: id, name: name });
      }   
      
      getManagerByID(id):any {
        return this.managerRepo.findOneBy({ id });
    }
    
    getManagerByIDName():any {
        return this.managerRepo.find();
    }
    
    addManager(mydto:ManagerDTO):any {
        const manageraccount = new ManagerEntity()
        manageraccount.name = mydto.name;
        manageraccount.contact = mydto.contact;
        manageraccount.email = mydto.email;
        manageraccount.password = mydto.password;
        manageraccount.filename = mydto.filename;
       return this.managerRepo.save(manageraccount);
          }
    
     
    
          async addmanager(mydto) {
            const salt = await bcrypt.genSalt();
            const hassedpassed = await bcrypt.hash(mydto.password, salt);
            mydto.password= hassedpassed;
            return this.managerRepo.save(mydto);
            }

            updateManager(name: string,id: any):any {
                console.log(name+id);
                return this.managerRepo.update(id,{name:name});
                }
                updateManagerbyid(mydto:ManagerUpdateDto,id):any {
                return this.managerRepo.update(id,mydto);
                   }
        
         
    

    deleteManagerbyid(id):any {
    
        return this.managerRepo.delete(id);
    }


    async signup(mydto) {
        const salt = await bcrypt.genSalt();
        const hassedpassed = await bcrypt.hash(mydto.password, salt);
        mydto.password= hassedpassed;
        return this.managerRepo.save(mydto);
        }
        
        async signin(mydto){
   
            if (mydto.email != null && mydto.password != null) {
                const mydata = await this.managerRepo.findOneBy({ email: mydto.email });
                const isMatch = await bcrypt.compare(mydto.password, mydata.password);
                if (isMatch) {
                    return true;
                }
                else {
                    return false;
                }
            } else {
                return false;
            }
        }

        async sendEmail(to: string, subject: string, text:string): Promise<void>{
            await this.mailerService.sendMail({
            to: to,
            subject: subject,
            text: text, 
          });
    
    }
  }
  

