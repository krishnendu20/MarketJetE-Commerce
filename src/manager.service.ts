import { Injectable } from '@nestjs/common';
import { ManagerDTO, ManagerUpdateDTO } from './manager.dto';
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
    
    async addManager(data: ManagerDTO): Promise<ManagerEntity> {
        return this.managerRepo.save(data);
    }

    async updateManager(email:string,data: ManagerUpdateDTO): Promise<ManagerEntity> {
        await this.managerRepo.update({email:email}, data);
        return this.managerRepo.findOneBy({ id: data.id });
    }
    async updateManagerById(id: number, data: ManagerDTO): Promise<ManagerEntity> {
        await this.managerRepo.update(id, data);
        return this.managerRepo.findOneBy({ id });
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
        
        async signin(ManagerDTO) {
            console.log(ManagerDTO.password);
            const getdata= await this.managerRepo.findOneBy({email:ManagerDTO.email});
        const matched = await bcrypt.compare(ManagerDTO.password, getdata.password);
        if(matched){
            return true;
        }
        else{
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
  

