import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository"


class UserController {
    async create(request: Request, response: Response) {
        const { name, email } = request.body;
        console.log(request.body)
        const usersRepository = getCustomRepository(UsersRepository);

        //verifica se já possui um usuario com esse email.
        const userAlreadyExists = await usersRepository.findOne({
            email
        })
        if (userAlreadyExists) {
            return response.status(400).json({
                error: "User already exists!"
            })
        }
        //faz um cadastro de usuario
        const user = usersRepository.create({
            name, email
        });
        console.log(user.name)
        await usersRepository.save(user);
        return response.status(201).json(user);
    }

}

export { UserController };