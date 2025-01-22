import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../src/controller/user.controller';
import { UserService } from '../src/service/user.service';


describe('UserController', () => {
  let userController: UserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userController = app.get<UserController>(UserController);
  });

});
