import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ViaCepModule } from './module/via-cep.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address, User } from './entity/entities';
import { UserService } from './service/user.service';
import { HttpModule } from '@nestjs/axios';
import { UserRepository } from './repository/user.repository';

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
  controllers: [AppController],
  providers: [AppService,UserService,UserRepository],
})
export class AppModule { }
