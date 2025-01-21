import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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


  @Get(':cpf')
  async getUser(@Param('cpf') cpf: string): Promise<UserDto> {
    console.log(cpf)
    return this.userService.getUserByCpf(cpf);
  }
}
