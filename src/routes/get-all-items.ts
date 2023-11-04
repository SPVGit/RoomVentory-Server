import { Request, Response, NextFunction } from "express";
import { logger } from "./logger";
import { AppDataSource } from "./data-source";
import { Item } from "../models/item";
import { User } from "../models/user";

export async function getAllItems(request: Request, response: Response, next: NextFunction) {

    //console.log(request.route.path)

    try {
        logger.debug(`Called getAllItems()`)

        const itemsArray = await AppDataSource
            .getRepository(Item)
            .createQueryBuilder("ITEMS")
            .orderBy('name')
            .getMany()

        console.log(itemsArray)


        response.status(200).json({ itemsArray })

    }
    catch (error) {

        logger.error('Error calling getAllCourses()')
        return next(error);

    }


}