import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../models/User";


class UserController {
    async create(request: Request, response: Response) {
        const { name, email } = request.body;
        const userRepository = getRepository(User);

        //verifica se já possui um usuario com esse email.
        const userAlreadyExists = userRepository.findOne({
            email
        })
        if (userAlreadyExists) {
            return response.status(400).json({
                error: "User already exists!"
            })
        }
        //faz um cadastro de usuario
        const user = userRepository.create({
            name, email
        });
        await userRepository.save(user);
        return response.json(user);
    } 

}

export { UserController };