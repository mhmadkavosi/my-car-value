import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  password: string;

  @AfterInsert()
  insertLog() {
    console.log(`insert user with id of ${this.id}`);
  }

  @AfterUpdate()
  updateLog() {
    console.log(`update user with id of ${this.id}`);
  }

  @AfterRemove()
  removeLog() {
    console.log(`remove user with id of ${this.id}`);
  }
}
