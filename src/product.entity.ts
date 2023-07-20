import {Column , Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { ManagerEntity } from "./manager.entity";
@Entity("product")
export class ProductEntity{

@PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  quantity: string;

  @Column()
  price: string;

  @ManyToOne(() => ManagerEntity, manager => manager.products)
manager: ManagerEntity;

}