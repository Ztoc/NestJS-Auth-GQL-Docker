import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, } from "typeorm";

import * as bcrypt from 'bcrypt'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password?: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}

