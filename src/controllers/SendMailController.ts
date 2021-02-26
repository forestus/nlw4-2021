import { Request, Response } from "express"
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UsersRepository } from "../repositories/UsersRepository";

class SendMailController{
    async execute(request:Request, response:Response){
        const { email, survey_id } = request.body;
        console.log(request.body)
        const usersRepository = getCustomRepository(UsersRepository);
        const surveysRepository = getCustomRepository(SurveysRepository)
        const surveysusersRepository = getCustomRepository(SurveysUsersRepository);

        const userAlreadyExists = await usersRepository.findOne({email});

        if(!userAlreadyExists){
            return response.status(400).json({
                error:"User Does not Exists!"
            })
        } 
        const surveyAlreadyExists = await surveysRepository.findOne({id:survey_id});

        if(!surveyAlreadyExists){
            return response.status(400).json({
                error:"Survey Does not Exists!"
            })
        }
        const surveyUser = surveysusersRepository.create({
            user_id: userAlreadyExists.id,
            survey_id
        }); 
        console.log(surveyUser)
        await surveysusersRepository.save(surveyUser);
        return response.status(201).json(surveyUser);

    }
}

export{ SendMailController}