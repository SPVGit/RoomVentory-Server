
import * as dotenv from 'dotenv';

//environment variables must be required before any other libraries

const result = dotenv.config();

import "reflect-metadata"

//------------------------------------------------------------------------

import { AppDataSource } from '../routes/data-source';
import { Item } from './item';
import { User } from './user';

async function deleteDb(){

    await AppDataSource.initialize();

    console.log(`Database connection ready`);

    console.log(`Clearing ITEMS table`)

    await AppDataSource.getRepository(Item)
        .delete({});

    console.log(`Clearing USERS table`)

    await AppDataSource.getRepository(User)
        .delete({});

}

deleteDb()
    .then(()=>{
        console.log(`Finished Deleting Database`);
        process.exit(0);
    })
    .catch(err => console.error(`Error deleting database, `, err))

