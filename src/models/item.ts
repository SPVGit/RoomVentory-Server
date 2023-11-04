import { Entity, PrimaryGeneratedColumn, JoinColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";

import { User } from "./user";

@Entity({

    name:'ITEMS'

})

export class Item {

    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column()
    name:string;

    @Column()
    image:string;

    @Column()
    description:string;

    @Column()
    quantity:number;

    //home, floor, room, section, furniture, furnitureSection
    @Column()
    expiryDate:string;

    @Column()
    home:string;

    @Column()
    floor:string;

    @Column()
    room:string;

    @Column()
    roomSection:string;

    @Column()
    furniture:string;

    @Column()
    furnitureSection:string;

    @ManyToOne(()=>User, user=>user.items)
    @JoinColumn({
        name:"userId"
    })
    user:User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    lastUpdatedAt:Date;


}