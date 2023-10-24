
import * as dotenv from 'dotenv';

//environment variables must be required before any other libraries

const result = dotenv.config();

if(result.error){

    console.log(`Error loading environment variables, aborting.`); //console.log will only be used here
    process.exit(1);

}

console.log(process.env.PORT)

import 'reflect-metadata';//Ensure this import is above the others so the others can access typeORM when it needs.
//reflect metadata is used by typeORM internally


//---------------------------------------------------------------------------------------------------


import * as express from 'express';
import {root} from './routes/root';
import { isInteger } from './utils';
import { logger } from './routes/logger'; //this is imported after the environment variables have been loaded
import { AppDataSource } from './routes/data-source';

//----------------------------------------------------------------------------------------------------

const app = express();

//---------------------------------------------------------------------------------------------------

//typeORM - Active Record Pattern Vs Data Mapper Pattern - The latter is being used - 

//---------------------------------------------------------------------------------------------------

function setUpExpress() {

    //http://locahost:9000

    app.route("/").get(root);


}

//---------------------------------------------------------------------------------------------------

function startServer(){

    //console.log(process.argv) //prints array from start-dev-server @ package.json

    const portEnv = process.env.PORT;

    const portArg = process.argv[2]; //At index 2 of the array, the port is written

    let port:number;


    if(isInteger(portEnv)){ //We are trying to access the PORT in .env file. 

        port = parseInt(portEnv)

    }

    if(!port && isInteger(portArg)){ //If we can't access PORT in .env, then we access the portArg from command line argument
        //i.e. from start-dev-server on package.json

        port = parseInt(portArg)

    }

    if(!port) { //If port can't be found anywhere else, then use 9000

        port = 9000
    }

    app.listen(port, () => {
        logger.info(`HTTP REST API server running at http://localhost:${port}`) //Here console.log has been changed to logger.info
    })

}

//-----------------------------------------------------------------------------------------------------


AppDataSource.initialize() //Only when data source is initialised, then we continue initialization of server
    .then(()=>{

        logger.info(`Data source has been initialized successfully`)
        setUpExpress()
        startServer()

    })
    .catch(err => {

        logger.error(`Error during datasource initialization, `, err)
        process.exit(1) //No point leaving data source up and running if an error occurs

    })