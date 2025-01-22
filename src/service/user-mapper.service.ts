import { Injectable } from '@nestjs/common';
import { AddressDto } from 'src/dto/address.dto';
import { UserDto } from 'src/dto/user.dto';


@Injectable()
export class UserMapperService {
  
  convertDbUser(user: any): UserDto {
    const newUser: UserDto = new UserDto();
    newUser.address = new AddressDto();

    newUser.cpf = user.cpf;
    newUser.address = user.address;

    return newUser;
  }


  setNewUserAddress(user: UserDto, data: any): void {
    user.address.street = data.logradouro;
    user.address.city = data.uf;
    user.address.state = data.estado;
  }

  setUserDataBase(user: any): UserDto {
    const newUser: UserDto = new UserDto();
    newUser.address = new AddressDto();
    newUser.cpf = user.cpf;
    newUser.address.cep = user.cep;
    newUser.address.houseNumber = user.houseNumber;

    return newUser;
  }
}