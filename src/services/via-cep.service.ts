import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'; 
import { lastValueFrom } from 'rxjs';
import { CepDto } from 'src/dtos/cep.dto';

@Injectable()
export class ViaCepService {
  constructor(private readonly httpService: HttpService) {}

  async searchCep(cep: string): Promise<CepDto> {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const response = await lastValueFrom(this.httpService.get(url));
    return response.data;
  }
}
