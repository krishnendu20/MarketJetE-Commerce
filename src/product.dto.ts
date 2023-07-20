import{IsEmail,IsNotEmpty,IsNumber,IsString,Matches,MaxLength,MinLength}from "class-validator";
export class ProductDTO{
    @IsNotEmpty()
    @IsString({message:"Enter product name here"})
    name:string;

    @IsNotEmpty()
    @IsString({message:"Enter product Quantity"})
    quantity: string;

    @IsNotEmpty()
    @IsString({message:"Enter product price"})
    price:string;
  
    addedby:number;
} 