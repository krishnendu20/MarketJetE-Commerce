import{IsEmail,IsNotEmpty,IsNumber,IsString,Matches,MaxLength,MinLength}from "class-validator";
export class ManagerDTO{
 
    name: string;
   

    contact : string;

    
    email: string;

    
    password: string;
    
    filename:string;

}

