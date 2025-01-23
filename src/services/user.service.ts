
import { Injectable, HttpException, NotFoundException, HttpStatus } from '@nestjs/common';
import { AddressDto } from '../dtos/address.dto';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { UserDto } from '../dtos/user.dto';
import { User } from '../entities/user';
import { UserRepository } from '../repositories/user.repository';
import { ViaCepService } from './via-cep.service';
import { UserMapper } from '../mappers/user-mapper';



@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly viaCepService: ViaCepService,
    private readonly userMapper: UserMapper
  ) { }


  async createUser(userData: CreateUserDto): Promise<User> {

    const cep = await this.viaCepService.searchCep(userData.cep)

    const userDb = await this.userRepository.findByCpf(userData.cpf);

    if (userDb) {
      throw new HttpException('Usuário já existe com esse CPF.', 402);
    }

    const newUser: UserDto = this.userMapper.setUserDataBase(userData);
    this.userMapper.setNewUserAddress(newUser, cep);
   
    return await this.userRepository.createUser(newUser);

  }



  async getUserByCpf(cpf: string, verify = false): Promise<UserDto> {
 
    const user = await this.userRepository.findByCpf(cpf);

    if (verify) {
      return user;
    }

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }


    return this.userMapper.convertDbUser(user);
  }


  async getAllUsers(): Promise<UserDto[]> {
    
    const users: UserDto[] = await this.userRepository.getAllUsers();

 
    return users;

  }


  async deleteByCpf(cpf: string)  {

      await this.userRepository.deleteByCpf(cpf);
 
  }

  async deleteAll()  {

      await this.userRepository.deleteAllUsers();
     
  }

}