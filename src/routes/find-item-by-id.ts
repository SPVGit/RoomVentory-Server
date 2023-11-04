



import { Request, Response, NextFunction } from "express";
import { logger } from "./logger";
import { AppDataSource } from "./data-source";
import { Item } from "../models/item";

export async function findItemById(request: Request, response: Response, next: NextFunction) {

    //console.log(request.route.path)

    try {

        logger.debug(`Called findItemById()`)

        const itemId = request.params.itemId;

        if(!itemId){
            throw 'Cound not extract itemId from request'
        }

        const item = await AppDataSource
            .getRepository(Item)
            .findOneBy({
                id:itemId
            });
        
        if(!item){
            const message = 'Could not find item';
            logger.error(message);
            response.status(404).json({message})
            return;
        }

        console.log(item)
        response.status(200).json({ item })

    }
    catch (err) {

        logger.error('Error calling findItemById()')
        return next(err);
    }


}