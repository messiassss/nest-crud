export class UpdateUserDto {
    address?: {
      cep?: string;
      street?: string;
      houseNumber?: number;
      city?: string;
      state?: string;
    };
  }