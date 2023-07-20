import { Module } from "@nestjs/common";
import { ManagerModule } from "./manager.module";
import{TypeOrmModule} from '@nestjs/typeorm';

@Module({
imports:[ManagerModule,TypeOrmModule.forRoot(
{type: 'postgres',
host:'localhost',
port: 5432,
username:'postgres',
password: '1234',
database: 'fhub',
autoLoadEntities: true,
synchronize: true,
}),],
controllers:[],
providers:[],
})


export class AppModule {}
