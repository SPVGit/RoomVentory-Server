



import { Request, Response, NextFunction } from "express";
import { logger } from "./logger";
import { AppDataSource } from "./data-source";
import { Item } from "../models/item";
import { User } from "../models/user";
//import { DeepPartial } from 'typeorm';

export async function postNewItem(request: Request, response: Response, next: NextFunction) {

//c74b33c0-343a-4eb8-99c4-63216355220a

    try {

        logger.debug(`Called postNewItem()`)

      //  const userId = request.params.userId;
        const userRepo = AppDataSource.getRepository(User)
        const userId = request.params.userId
        const user = await userRepo.findOne({where:{id:userId}})

//console.log(userRepo)

     /*   if (!request.body) {
            throw 'Cound not extract item from request'
        }*/ console.log('reqbody',request.body)
       // let user = "4ff177ed-636d-4f5e-abcd-d66b486481be"
      

        const { name, image, description, quantity, expiryDate, home, floor, room, roomSection, furniture, furnitureSection } = request.body;

       /* if(!user) {
            throw 'User not found'
        }*/

       const itemRepo  = AppDataSource.getRepository(Item)
       const newItem = itemRepo.create({
        name,
        image,
        description,
        quantity,
        expiryDate,
        home,
        floor,
        room,
        roomSection,
        furniture,
        furnitureSection,
        
      })

      newItem.user = user

      const savedItem = await itemRepo.save(newItem);

      const itemWithUser = await itemRepo.findOne({
        where: { name: 'Monkey' },
        relations: ["user"]
    });

    console.log('The item is', itemWithUser.name)
    console.log('User data for item:', itemWithUser.user);

    console.log(await itemRepo.createQueryBuilder().getMany())
    console.log(await userRepo.createQueryBuilder().getMany())

    }
    catch (err) {

        logger.error('Error calling postNewItem()')
        return next(err);
    }


}