import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserDto } from '../dto/user.dto';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
   
    return this.userService.createUser(createUserDto);
  }


  @Get(':cpf')
  async getUser(@Param('cpf') cpf: string): Promise<UserDto> {
  
    return this.userService.getUserByCpf(cpf);
  }


  @Delete()
  async deleteAll(): Promise<String> {
    return this.userService.deleteAll();
  }


  @Delete(':cpf')
  async deleteByCpf(@Param('cpf') cpf: string): Promise<String>{
    return this.userService.deleteByCpf(cpf);
  }


  @Get()
  async getAll(): Promise<UserDto[]> {
    return this.userService.getAllUsers();
  }
}
