import {Body, Controller, Get,Param, Post,UsePipes,ValidationPipe,Delete, UseInterceptors,Put,Patch,ParseIntPipe, NotFoundException, HttpStatus, Query, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, Session, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ManagerService } from "./manager.service";
import{ManagerDTO, ManagerUpdateDTO}from "./manager.dto";
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
    @UsePipes(new ValidationPipe())
    addAdmin(@Body() data: ManagerDTO): object {
        return this.managerService.addManager(data);
    }

    @Put('/updatemanager')
    @UseGuards(SessionGuard)
    //@UsePipes(new ValidationPipe())
    updateAdmin(@Body() data: ManagerUpdateDTO, @Session() session): object {
        console.log(session.email);
        return this.managerService.updateManager(session.email, data);
    }
    @Put('/updatemanager/:id')
    @UsePipes(new ValidationPipe())
    updateManagerbyID(@Param() id: number, @Body() data: ManagerDTO): object {
        return this.managerService.updateManagerById(id, data);
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

    signup(@Body() mydto:ManagerDTO,@UploadedFile( new ParseFilePipe({
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
      async signin(@Session() session, @Body() ManagerDTO : ManagerDTO) {
  
          if (await this.managerService.signin(ManagerDTO)) {
              //  session.email = ManagerDTO.email;
              //  console.log(session.email);
              return {message:"Logged in Successfully"};
          }
          else {
  
            return {message:"Invalid"};
          }
            // return this.managerService.signin(data);
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
    @UsePipes(new ValidationPipe())
    addProduct(@Body() data: ProductDTO): object {
        return this.productService.addProduct(data);
    }
    @Put('/updateproduct/')
    // @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    updateProduct(@Body('name') name: string,@Body('quantity') quantity: string, @Body('id') id: number):any {
        return this.productService.updateProduct(name,quantity,id);
    } 

    
    @Put('/updateproduct/:id')
    @UsePipes(new ValidationPipe())
    updateProductbyID(@Param() id: number, @Body() data: ProductDTO): object {
        return this.productService.updateProductById(id, data);
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

