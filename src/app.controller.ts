import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './service/user.service';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
   
    return this.userService.createUser(createUserDto);
  }


  @Get('user/:cpf')
  async getUser(@Param('cpf') cpf: string): Promise<UserDto> {
  
    return this.userService.getUserByCpf(cpf);
  }


  @Delete('all')
  async deleteAll(): Promise<String> {
    return this.userService.deleteAll();
  }


  @Delete('user/:cpf')
  async deleteByCpf(@Param('cpf') cpf: string): Promise<String>{
    return this.userService.deleteByCpf(cpf);
  }


  @Get('all')
  async getAll(): Promise<UserDto[]> {
    return this.userService.getAllUsers();
  }
}
