
import { Entity, JoinColumn, PrimaryGeneratedColumn,Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";

import { Item } from "./item";

@Entity(
    {
        name: "USERS"
    }
)

export class User {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string;
    
    @Column()
    email: string

    @Column()
    password: string

    @OneToMany(() => Item, item => item.user )
    items: Item[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    lastUpdatedAt:Date;
}