import { Module } from '@nestjs/common';
import { UserController } from '../controllers/user.controller';
import { ViaCepModule } from './via-cep.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user';
import { Address } from '../entities/address'
import { UserService } from '../services/user.service';
import { HttpModule } from '@nestjs/axios';
import { UserRepository } from '../repositories/user.repository';
import { ViaCepService } from 'src/services/via-cep.service';
import { UserMapper } from 'src/mappers/user-mapper';

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
  providers: [UserService,ViaCepService,UserMapper,UserRepository],
})
export class UserModule { }
