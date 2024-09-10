import prisma from "../config/dbConnection";
import { Request, Response } from 'express';

//Find All Users
export const findAllUser = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany({
            where: {
                isDelete: false,

            },
            select: {
                name: true,
                age: true,
                email: true,
                password: true,
                _count: {
                    select: {
                        contents: true
                    }
                }
            },
        });
        res.status(200).send(users);
    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
}

//Find One User
export const findUser = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const user = await prisma.user.findUnique({
            where: { id },
            include: {
                contents: {
                    select: {
                        title: true,
                        data: true
                    }
                },
                _count: {
                    select: {
                        contents: true
                    }
                }
            }
        });

        if (!user || user.isDelete) {
            return res.status(404).send(`User with ID ${id} not found`);
        }

        console.log(user);
        res.status(200).send(user);
    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
};


//Create User
export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, age, email, password } = req.body
        const ParsedAge = Number(age);
        const isEmail = await prisma.user.findUnique({
            where: { email: email }
        })

        if (isEmail) {
            return res.status(404).send(`This email ${email}, already exist. Please uniqure one`);
        }

        const newUser = await prisma.user.create({
            data: { name, age: ParsedAge, email, password }
        })
        res.status(200).send(newUser);
    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
}

//Update User
export const updateUser = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const isUser = await prisma.user.findUnique({
            where: { id }
        })
        if (!isUser || isUser.isDelete === true) {
            return res.status(404).send(`User with ID ${id} not found`);
        }
        const { name, age, email, password } = req.body
        const ParsedAge = Number(age);
        const updateUser = await prisma.user.update({
            where: { id },
            data: { name, age: ParsedAge, email, password }
        })

        res.status(200).send(updateUser);

    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
}

//Soft Delete User
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const isUser = await prisma.user.findUnique({
            where: { id }
        })
        if (!isUser || isUser.isDelete === true) {
            return res.status(404).send(`User with ID ${id} not found`);
        }

        const deleteUser = await prisma.user.update({
            where: { id },
            data: { isDelete: true }
        })

        res.status(200).send(deleteUser);

    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
}
