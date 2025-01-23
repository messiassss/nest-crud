import { Repository } from 'typeorm';
import { User } from '../entities/user';
import { CreateUserDto } from '../dtos/create-user.dto';
import { Injectable } from '@nestjs/common';
import { UserDto } from '../dtos/user.dto';
import { AddressDto } from '../dtos/address.dto';
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

}