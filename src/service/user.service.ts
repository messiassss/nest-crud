import { HttpService } from '@nestjs/axios';
import { Injectable, HttpException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom } from 'rxjs';
import { AddressDto } from 'src/dto/address.dto';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UserDto } from 'src/dto/user.dto';
import { User } from 'src/entity/entities';
import { Repository } from 'typeorm';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly httpService: HttpService
  ) { }


  async createUser(userData: CreateUserDto): Promise<UserDto> {

    const url = `https://viacep.com.br/ws/${userData.cep}/json/`;
    let responseCEP;

    try {
      responseCEP = await lastValueFrom(this.httpService.get(url));

      if (responseCEP.status !== 200) {
        throw new Error(`Erro ao consultar o CEP na API VIA-CEP: ${responseCEP.status}`);
      }

    } catch (error) {
    
      throw new HttpException('Verifique a disponibilidade da API.', 500);
    }


    //Veriicar se o usuario ja existe 
    try {
      const user: UserDto = await this.getUserByCpf(userData.cpf, true)

      if (user) {
  
        throw new Error("Já existe um usuario com esse CPF "+userData.cpf);
      }
    } catch (error) {

      throw new HttpException('Erro durante a verificação de usuário ' + error, 500);
    }



    //Settando o retorno dos dados do cep     
    let newUser: UserDto = this.setUserDataBase(userData);

    this.setNewUserAddress(newUser, responseCEP.data);


    //Salvando no banco

    let userEntity;
    try {

      userEntity = await this.userRepository.create(newUser);
      await this.userRepository.save(userEntity);

    }
    catch (error) {
      throw new HttpException('Erro ao criar e salvar entidade no banco: ' + error, 500);
    }

    return userEntity;

  }

  async getUserByCpf(cpf: string, verify = false): Promise<UserDto> {

    const user: UserDto = await this.userRepository.findOne({ where: { cpf } });

    if (verify) {
      return user;
    }

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }


    return this.converterDbUser(user);
  }




  private setNewUserAddress(user: UserDto, data: any) {

    user.address.street = data.logradouro;
    user.address.city = data.uf;
    user.address.state = data.estado;

  }

  private setUserDataBase(user: any): any {
    let newUser: UserDto = new UserDto();
    newUser.address = new AddressDto();

    newUser.cpf = user.cpf;
    newUser.address.cep = user.cep;
    newUser.address.houseNumber = user.houseNumber;

    return newUser;
  }


  private converterDbUser(user: any): any {
    let newUser: UserDto = new UserDto();
    newUser.address = new AddressDto();

    newUser.cpf = user.cpf;
    newUser.address = user.address;

    return newUser;
  }
}