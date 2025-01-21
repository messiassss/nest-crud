import { Entity, PrimaryColumn, Column  } from 'typeorm';


export class Address {
  @Column()
  cep: string;

  @Column()
  street: string;

  @Column()
  houseNumber: number;

  @Column()
  city: string;

  @Column()
  state: string;
}

@Entity()
export class User {
  @PrimaryColumn()
  cpf: string;

  @Column(() => Address)
  address: Address;
}

