import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'; 
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ViaCepService {
  constructor(private readonly httpService: HttpService) {}

  async searchCep(cep: string): Promise<any> {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const response = await lastValueFrom(this.httpService.get(url));
    return response.data;
  }
}
