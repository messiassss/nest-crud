import { Body, Controller, Delete, Get, HttpException, Param, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserDto } from '../dtos/user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';

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
  async deleteAll() {
    try {
      await this.userService.deleteAll();
      return { message :'Usuarios deletados com sucesso', statusCode:  204};
    } catch (error) {
      throw new HttpException('Erro inesperado durante o metodo de deletar todos os usuarios', 402);
    }
  }


  @Delete(':cpf')
  async deleteByCpf(@Param('cpf') cpf: string){
    try {
      await this.userService.deleteByCpf(cpf);
      return { message: 'Usuario deletado com sucesso', statusCode: 204 };
    } catch (error) {
      throw new HttpException('Erro inesperado durante a tentativa de deletar o usuario com o cpf: ' + error, 500);
    }
  }


  @Get()
  async getAll(): Promise<UserDto[]> {
    return this.userService.getAllUsers();
  }
}
