import { Module } from "@nestjs/common";
import { ManagerController } from "./manager.controller";
import { ManagerService } from "./manager.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ManagerEntity} from "./manager.entity";
import { ProductService } from "./product.service";
import { ProductEntity } from "./product.entity";
import { MailerModule } from "@nestjs-modules/mailer";

@Module({
    imports: [
      MailerModule.forRoot({
        transport: {
          host: 'smtp.gmail.com',
                   port: 465,
                   ignoreTLS: true,
                   secure: true,
                   auth: {
                    // user: 'dipto.roy.aiub@gmail.com',
                       pass: ''
                   },
                  }
      }),
       TypeOrmModule.forFeature([ManagerEntity,ProductEntity]),
      
  ],
    controllers: [ManagerController],
    providers: [ManagerService,ProductService],
  })
  export class ManagerModule {}

