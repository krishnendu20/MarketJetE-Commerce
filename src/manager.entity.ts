import {Column , Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { ProductEntity } from "./product.entity";
@Entity("Manager")
export class ManagerEntity{

@PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  contact: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  filename: string;

}
