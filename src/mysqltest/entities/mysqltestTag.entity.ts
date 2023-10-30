import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Generated,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { Mysqltest } from './mysqltest.entity';

@Entity()
export class MysqltestTag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ManyToOne(() => Mysqltest)
  user: Mysqltest;
}
