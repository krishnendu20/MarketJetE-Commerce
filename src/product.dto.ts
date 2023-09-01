import{IsEmail,IsNotEmpty,IsNumber,IsString,Length,Matches,MaxLength,MinLength}from "class-validator";
import { PrimaryGeneratedColumn } from "typeorm";
export class ProductDTO{
    

  
    name:string;


    
    quantity: string;

   
    
    price:string;

    filename:string;

  
   
} 