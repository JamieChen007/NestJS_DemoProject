import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Generated,
  OneToMany,
} from 'typeorm';
import { MysqltestTag } from './mysqltestTag.entity';

@Entity()
export class Mysqltest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ select: true, comment: 'zhushi', default: '123', nullable: true })
  password: string;

  @Column({ type: 'int' })
  age: number;

  @Generated('uuid')
  uuid: string;

  @CreateDateColumn({ type: 'timestamp' })
  createTime: Date;

  @Column({
    type: 'enum',
    enum: ['male', 'female'],
    default: 'male',
  })
  gender: string;

  @Column('simple-array')
  names2: string[];

  // @Column('simple-json')
  // json: { name: string; age: number };

  @OneToMany(() => MysqltestTag, (tags) => tags.user)
  tags: MysqltestTag[];
}
