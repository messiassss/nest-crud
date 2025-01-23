import { Injectable } from '@nestjs/common';
import { AddressDto } from 'src/dtos/address.dto';
import { CepDto } from 'src/dtos/cep.dto';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { UserDto } from 'src/dtos/user.dto';
import { User } from 'src/entities/user';


@Injectable()
export class UserMapper {
  
  convertDbUser(user: User): UserDto {
    const newUser: UserDto = new UserDto();
    newUser.address = new AddressDto();

    newUser.cpf = user.cpf;
    newUser.address = user.address;

    return newUser;
  }


  setNewUserAddress(user: UserDto, data: CepDto): void {
    user.address.street = data.logradouro;
    user.address.city = data.uf;
    user.address.state = data.estado;
  }

  setUserDataBase(user: CreateUserDto): UserDto {
    const newUser: UserDto = new UserDto();
    newUser.address = new AddressDto();
    newUser.cpf = user.cpf;
    newUser.address.cep = user.cep;
    newUser.address.houseNumber = user.houseNumber;

    return newUser;
  }
}