import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ViaCepController } from 'src/controller/via-cep.controller';
import { ViaCepService } from 'src/service/via-cep.service';

@Module({
  imports: [HttpModule],  // Importando o HttpModule para requisições HTTP
  controllers: [ViaCepController],
  providers: [ViaCepService],
})
export class ViaCepModule {}