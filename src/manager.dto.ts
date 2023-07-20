import{IsEmail,IsNotEmpty,IsNumber,IsString,Matches,MaxLength,MinLength}from "class-validator";
export class ManagerDTO{
   @IsNotEmpty()
    @MinLength(2, {
        message: 'Name is too Short',
      })
      @MaxLength(10, {
        message: 'Title is too Long',
      })
    name: string;
   
    @IsNotEmpty()
    @IsNumber()
    contact : string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(2)
    @MaxLength(8)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'Week Password'})
    password: string;
    
    filename:string;

}
export class ManagerUpdateDTO {
  id: number;
  name: string;
  email: string;
  password: string;
}
