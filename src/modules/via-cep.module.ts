import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ViaCepController } from 'src/controllers/via-cep.controller';
import { ViaCepService } from 'src/services/via-cep.service';

@Module({
  imports: [HttpModule],  
  controllers: [ViaCepController],
  providers: [ViaCepService],
})
export class ViaCepModule {}