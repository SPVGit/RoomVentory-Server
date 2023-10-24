
import * as dotenv from 'dotenv';

//environment variables must be required before any other libraries

const result = dotenv.config();

import "reflect-metadata"

//---------------------------------------------------------------------------

import {USERS } from "./db-data"; 
import { User } from './user';
import { Item } from './item';
import { DeepPartial } from 'typeorm';
import { AppDataSource } from '../routes/data-source';

//---------------------------------------------------------------------------

async function populateDb(){

    await AppDataSource.initialize();

    console.log(`Database connection ready`);

    const users = Object.values(USERS) as DeepPartial<User>[];

    const userRepository = AppDataSource.getRepository(User);

    const itemRepository = AppDataSource.getRepository(Item);


    for (let userData of users){

        console.log(`inserting user`, userData.name);
        const user = userRepository.create(userData);
        await userRepository.save(user);

        for(let itemData of userData.items){

            console.log(`inserting items`, itemData.name);
            const item = itemRepository.create(itemData);
            item.user = user;
            await itemRepository.save(item);

        }
    }

    const totalUsers = await userRepository
    .createQueryBuilder()
    .getCount();

    const totalItems = await itemRepository
    .createQueryBuilder()
    .getCount();
    
    console.log(`Data instered - users = ${totalUsers}, items = ${totalItems}`)

}

populateDb()
    .then(()=>{
        console.log(`Finished Populating Database`);
        process.exit(0);
    })
    .catch(err => console.error(`Error populating database, `, err))

