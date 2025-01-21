import { HttpService } from '@nestjs/axios';
import { Injectable, HttpException, NotFoundException } from '@nestjs/common';
import { AddressDto } from '../dto/address.dto';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UserDto } from '../dto/user.dto';
import { User } from '../entity/entities';
import { UserRepository } from '../repository/user.repository';



@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly httpService: HttpService
  ) { }


  async createUser(userData: CreateUserDto): Promise<User> {
    const url = `https://viacep.com.br/ws/${userData.cep}/json/`;
    let responseCEP;

    try {
      responseCEP = await this.httpService.axiosRef.get(url);

      if (responseCEP.status !== 200) {
        throw new HttpException(`Erro ao consultar o CEP na API VIA-CEP: ${responseCEP.status}`, 500);
      }

    } catch (error) {
      throw new HttpException('Verifique a disponibilidade da API de CEP.', 500);
    }

    const userDb = await this.userRepository.findByCpf(userData.cpf);

    if (userDb) {
      throw new HttpException('Usuário já existe com esse CPF.', 500);
    }

    const newUser = await this.userRepository.createUser(userData, responseCEP.data);
    return newUser;
  }



  async getUserByCpf(cpf: string, verify = false): Promise<UserDto> {
 
    const user = await this.userRepository.findByCpf(cpf);

    if (verify) {
      return user;
    }

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }


    return this.converterDbUser(user);
  }


  async getAllUsers(): Promise<UserDto[]> {
    
    const users: UserDto[] = await this.userRepository.getAllUsers();

    if (!users) {
      throw new NotFoundException('Não foi encontrado nenhum usuario');
    }

    return users;

  }


  async deleteByCpf(cpf: string): Promise<String>  {

    try {
      await this.userRepository.deleteByCpf(cpf);
      return 'Foi deletado com sucesso o usuario com o CPF: '+cpf;
    } catch (error) {
      throw new HttpException('Erro inesperado durante a tentativa de deletar o usuario com o cpf: '+cpf, 500);
    }
  }

  async deleteAll(): Promise<String>  {

    try {
      await this.userRepository.deleteAllUsers();
      return 'Todos os usuarios deletados com sucesso';
    } catch (error) {
      throw new HttpException('Erro inesperado durante o metodo de deletar todos os usuarios', 500);
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