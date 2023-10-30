import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Manager {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column({ type: 'float', nullable: true })
  money: number;
}

@Entity()
export class Transfer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: true })
  fromId: number;

  @Column({ type: 'int', nullable: true })
  toId: number;

  @Column({ type: 'float', nullable: true })
  amount: number;
}
