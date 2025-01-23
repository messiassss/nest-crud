import { Column  } from 'typeorm';


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