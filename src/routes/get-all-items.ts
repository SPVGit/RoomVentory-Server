import {Request, Response} from "express";
import { logger } from "./logger";
import { AppDataSource } from "./data-source";
import { Item } from "../models/item";

export async function getAllItems(request: Request, response: Response){

    logger.debug(`Called getAllItems()`)

    const itemsArray = await AppDataSource
    .getRepository(Item)
    .createQueryBuilder("ITEMS")
    .orderBy('name')
    .getMany()

    response.status(200).json({itemsArray})
}