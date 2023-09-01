import {Body, Controller, Get,Param, Post,UsePipes,ValidationPipe,Delete, UseInterceptors,Put,Patch,ParseIntPipe, NotFoundException, HttpStatus, Query, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, Session, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ManagerService } from "./manager.service";
import{ManagerDTO}from "./manager.dto";
import {ManagerUpdateDto} from "./managerupdatedto.dto"
import { FileInterceptor } from "@nestjs/platform-express";
import{diskStorage} from  "multer";
import { ManagerEntity } from './manager.entity';
import { SessionGuard } from './session.guard';
import session = require("express-session");
import { ProductService } from './product.service';
import { ProductDTO } from './product.dto';

@Controller('manager')
export class ManagerController {

  constructor(private readonly managerService: ManagerService,private readonly productService: ProductService
    ) {}

  @Get('/index')
  getIndex(): any {
    return this.managerService.getIndex();
  }

  @Get('/search/:id')
    async getAdminById(@Param('id', ParseIntPipe) id: number): Promise<ManagerEntity> {

        const res = await this.managerService.getAdminById(id)
        if (res !== null) {
            console.log(res);
            return res;
        }
        else {
            throw new NotFoundException({
                status: HttpStatus.NOT_FOUND,
                message: "Admin not found"
            });
        }
    }

    @Get('/search')
    getAdminbyIDAndName(@Query() qry: any): object {

        return this.managerService.getAdminbyIDAndName(qry.id, qry.name);
    }


    @Get('/findmanager')
    getManagerByIDName(): any {
      return this.managerService.getManagerByIDName();
    }

    @Get('/findmanager/:id')
    getManagerByID(@Param('id', ParseIntPipe) id: number): any {
      return this.managerService.getManagerByID(id);
    }

    



    @Post('/addmanager')
  
    @UseInterceptors(FileInterceptor('filename',
  
    {storage:diskStorage({
  
      destination: './managers',
  
      filename: function (req, file, cb) {
  
        cb(null,Date.now()+file.originalname)
  
      }
  
    })
  
  }))
  
  insertauthor(@Body() mydto:ManagerDTO,@UploadedFile(  new ParseFilePipe({
  
    validators: [
  
      new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
  
      new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
  
    ],
  
  }),) file: Express.Multer.File){
  
   
  
  mydto.filename = file.filename;  
  
   
  
  return this.managerService.addManager(mydto);
  
  // console.log(file)
  
  }


   @Put('/updatemanager/')
        // @UseGuards(SessionGuard)
        @UsePipes(new ValidationPipe())
        updateManager(@Session() session,@Body('name') name: string, @Body('id') id: string): any {
        // console.log(session.email);
          return this.managerService.updateManager(name, id);
        }

        @Put('/updatemanager/:id')
        @UsePipes(new ValidationPipe())
        updateManagerbyid(
          @Body() mydto: ManagerUpdateDto,
          @Param('id', ParseIntPipe) id: number,
        ): any {
          return this.managerService.updateManagerbyid(mydto, id);
        }
  
    @Delete('/deletemanager/:id')
    deleteManagerbyid(@Param('id', ParseIntPipe) id: number): any {
      return this.managerService.deleteManagerbyid(id);
    }
  
    @Post('/signup')
@UseInterceptors(FileInterceptor('filename',
{storage:diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
    cb(null,Date.now()+file.originalname)
  }
})

}))
signup(@Body() mydto:ManagerDTO,@UploadedFile(  new ParseFilePipe({
  validators: [
    new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
    new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
  ],
}),) file: Express.Multer.File){

mydto.filename = file.filename;  

return this.managerService.signup(mydto);
// console.log(file)
}

@Post('/signin')
@UsePipes(new ValidationPipe())
async signin(@Session() session, @Body() mydto:ManagerDTO)
{
  const res = await (this.managerService.signin(mydto));
if(res==true)
{
session.email = mydto.email;
return (session.email);
}
else
{
throw new UnauthorizedException({ message: "Invalid!!" });
}
 
}
  

      @Get('/signout')
      signout(@Session() session)
      {
        if(session.destroy())
        {
          return {message:"Signed Out"};
        }
        else
        {
          throw new UnauthorizedException("invalid Actions");
        }
      }

      //Product Part 

      @Get('/pdashboard')
      getProduct(): any {
        return this.productService.getProduct();
      }

      @Get('/findproduct')
    getProductByIDName(): any {
      return this.productService.getProductByIDName();
    }

    @Get('/findproduct/:id')
    getProductByID(@Param('id', ParseIntPipe) id: number): any {
      return this.productService.getProductByID(id);
    }

 

    @Post('/addproduct')
  
    @UseInterceptors(FileInterceptor('filename',
  
    {storage:diskStorage({
  
      destination: './products',
  
      filename: function (req, file, cb) {
  
        cb(null,Date.now()+file.originalname)
  
      }
  
    })
  
  }))
  
  addproduct(@Body() mydto:ProductDTO,@UploadedFile(  new ParseFilePipe({
  
    validators: [
  
      new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
  
      new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
  
    ],
  
  }),) file: Express.Multer.File){
  
   
  
  mydto.filename = file.filename;  
  
   
  
  return this.productService.addProduct(mydto);
  }


  @Put('/updateproduct/')
  // @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  updateProduct(@Session() session,@Body('name') name: string, @Body('id') id: string): any {
  // console.log(session.email);
    return this.productService.updateProduct(name, id);
  }

  @Put('/updateproduct/:id')
  @UsePipes(new ValidationPipe())
  updateProductbyid(
    @Body() mydto: ManagerUpdateDto,
    @Param('id', ParseIntPipe) id: number,
  ): any {
    return this.productService.updateProductbyid(mydto, id);
  }

    @Delete('/deleteproduct/:id')
    deleteProductbyid(@Param('id', ParseIntPipe) id: number): any {
      return this.productService.deleteProductbyid(id);
    }

    @Post('/sendemail')
    async sendEmail
    (
      @Body('to') to: string,
      @Body('subject') subject: string,
      @Body('text') text: string,
    ): Promise<void>
    {
    await this.managerService.sendEmail(to, subject, text);
    }
    

}

