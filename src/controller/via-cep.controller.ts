import { Controller, Get, Param } from '@nestjs/common';
import { ViaCepService } from 'src/service/via-cep.service';

@Controller('cep')
export class ViaCepController {
  constructor(private readonly viaCepService: ViaCepService) {}

  @Get(':cep')
  async getCep(@Param('cep') cep: string) {
    console.log("aqui")
    return this.viaCepService.buscarCep(cep);
  }
}