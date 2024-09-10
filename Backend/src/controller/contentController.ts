import prisma from '../config/dbConnection';
import { Request, Response } from 'express';

//Get All Content
export const getContent = async (req: Request, res: Response) => {
    let  page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;
    if(page <= 0){
        page = 1
    }
    if(limit <= 0 || limit > 100){
        limit = 10;
    }
    const skip = (page -1) * limit;
    try {
        const title = req.query.title as string | undefined;

        if (title) {
            const contents = await prisma.content.findMany({
                skip: skip,
                take: limit,
                where: {
                    title: title,
                    isDelete: false,
                }
            });

            if (contents.length === 0) {
                return res.status(404).send(`No content found with title "${title}"`);
            }
            res.status(200).send(contents);
        } else {
            const contents = await prisma.content.findMany({
                where: {
                    isDelete: false,
                }
            });

            const totalContent = await prisma.content.count();
            const totalPages = Math.ceil( totalContent / limit);
            
            res.status(200).json({
                contents,
                meta: {
                    totalPages,
                    currentPage: page,
                    limit: limit,
                }
            });
        }
    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
}

//Create Content
export const createContent = async (req: Request, res: Response) => {
    try{
        const {title, data, user_id} = req.body
        console.log(title, data, user_id);
        const content = await prisma.content.create({
            data: {title, data, user_id}
        })
        res.status(200).send(content);
    }catch(e){
        console.log(e);
        res.status(500).send(e);
    }
}

//Update User
export const updateContent = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        console.log("Id" , id)
        const isContent = await prisma.content.findUnique({
            where: { id }
        })
        if (!isContent || isContent.isDelete === true) {
            return res.status(404).send(`User with ID ${id} not found`);
        }
        const { title, data} = req.body
        const updateContent = await prisma.content.update({
            where: { id },
            data: { title, data}
        })
        res.status(200).send(updateContent);
    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
}

//Soft Delete User
export const deleteContent = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const isContent= await prisma.content.findUnique({
            where: { id }
        })
        if (!isContent || isContent.isDelete === true) {
            return res.status(404).send(`User with ID ${id} not found`);
        }
        const deleteContent = await prisma.content.update({
            where: { id },
            data: { isDelete: true}
        })
        res.status(200).send(deleteContent);

    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
}