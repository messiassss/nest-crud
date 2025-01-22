import { Module } from '@nestjs/common';
import { UserController } from '../controller/user.controller';
import { ViaCepModule } from './via-cep.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/user';
import { Address } from '../entity/address'
import { UserService } from '../service/user.service';
import { HttpModule } from '@nestjs/axios';
import { UserRepository } from '../repository/user.repository';
import { ViaCepService } from 'src/service/via-cep.service';
import { UserMapperService } from 'src/service/user-mapper.service';

@Module({
  imports: [ViaCepModule,
    HttpModule, 
    TypeOrmModule.forRoot({ 
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Address,User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]), 
  ],
  controllers: [UserController],
  providers: [UserService,ViaCepService,UserMapperService,UserRepository],
})
export class UserModule { }
