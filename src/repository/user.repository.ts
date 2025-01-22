import { Repository } from 'typeorm';
import { User } from '../entity/user';
import { CreateUserDto } from '../dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { AddressDto } from '../dto/address.dto';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class UserRepository {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>   
      ) {}


  async findByCpf(cpf: string): Promise<User> {
    return await this.userRepository.findOne({ where: { cpf } });
  }

  async createUser( user:UserDto): Promise<User> {
  
    // const newUser: UserDto = this.setUserDataBase(userData);
    
    // this.setNewUserAddress(newUser, cepData);

    const userEntity = this.userRepository.create(user);
     return await this.userRepository.save(userEntity);
  }


  async getAllUsers(): Promise<User[]>{
  
    return await this.userRepository.find();
  }


  async deleteAllUsers(){
    await this.userRepository.clear();
  }

  async deleteByCpf(cpf: string){
    await this.userRepository.delete({ cpf });
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

}