
import { Injectable, HttpException, NotFoundException, HttpStatus } from '@nestjs/common';
import { AddressDto } from '../dto/address.dto';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UserDto } from '../dto/user.dto';
import { User } from '../entity/user';
import { UserRepository } from '../repository/user.repository';
import { ViaCepService } from './via-cep.service';
import { UserMapperService } from './user-mapper.service';



@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly viaCepService: ViaCepService,
    private readonly userMapperService: UserMapperService
  ) { }


  async createUser(userData: CreateUserDto): Promise<User> {

    let responseCep;

    try {
      responseCep = await this.viaCepService.searchCep(userData.cep)

      if (responseCep.status !== 200) {
        throw new Error();
      }

    } catch (error) {
      throw new HttpException('Verifique a disponibilidade da API de CEP.', 402);
    }

    const userDb = await this.userRepository.findByCpf(userData.cpf);

    if (userDb) {
      throw new HttpException('Usuário já existe com esse CPF.', 402);
    }


    const newUser: UserDto = this.userMapperService.setUserDataBase(userData);
    this.userMapperService.setNewUserAddress(newUser, responseCep.data);
   
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


    return this.userMapperService.convertDbUser(user);
  }


  async getAllUsers(): Promise<UserDto[]> {
    
    const users: UserDto[] = await this.userRepository.getAllUsers();

 
    return users;

  }


  async deleteByCpf(cpf: string): Promise<String>  {

    try {
      await this.userRepository.deleteByCpf(cpf);
      throw new HttpException('Usuario deletado com sucesso', 204);
    } catch (error) {
      throw new HttpException('Erro inesperado durante a tentativa de deletar o usuario com o cpf: '+cpf, 402);
    }
  }

  async deleteAll(): Promise<String>  {

    try {
      await this.userRepository.deleteAllUsers();
      throw new HttpException('Usuarios deletados com sucesso', 204);
    } catch (error) {
      throw new HttpException('Erro inesperado durante o metodo de deletar todos os usuarios', 402);
    }

  }



  private converterDbUser(user: any): any {
    let newUser: UserDto = new UserDto();
    newUser.address = new AddressDto();

    newUser.cpf = user.cpf;
    newUser.address = user.address;

    return newUser;
  }
}