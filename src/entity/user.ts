import { Entity, PrimaryColumn, Column  } from 'typeorm';
import { Address } from './address';

@Entity()
export class User {
  @PrimaryColumn()
  cpf: string;

  @Column(() => Address)
  address: Address;
}

export { Address };

