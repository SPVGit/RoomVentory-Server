import  {DataSource} from "typeorm"
import { User } from "../models/user"
import { Item } from "../models/item"

export const AppDataSource = new DataSource ({

    type: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_NAME,
    url: process.env.DB_URL,
    ssl:true,
    entities:[
        User, Item
    ],
    synchronize:true,
    logging:true
})