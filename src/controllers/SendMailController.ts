import { Request, Response } from "express"
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import SendMailService from "../services/SendMailService";
import { resolve } from "path";

class SendMailController {
    async execute(request: Request, response: Response) {
        const { email, survey_id } = request.body;
        const usersRepository = getCustomRepository(UsersRepository);
        const surveysRepository = getCustomRepository(SurveysRepository)
        const surveysusersRepository = getCustomRepository(SurveysUsersRepository);

        const user = await usersRepository.findOne({ email });

        if (!user) {
            return response.status(400).json({
                error: "User Does not Exists!"
            })
        }
        const survey = await surveysRepository.findOne({ id: survey_id });

        if (!survey) {
            return response.status(400).json({
                error: "Survey Does not Exists!"
            })
        }
        const variables = {
            name: user.name,
            title: survey.title,
            description: survey.description,
            user_id: user.id,
            link: process.env.URL_MAIL

        }
        const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");

        const surveyUserAlreadyExists = await surveysusersRepository.findOne({
            where: [{ user_id: user.id }, { value: null }],
            relations: ["user", "survey"]
        })
        if (surveyUserAlreadyExists) {
            await SendMailService.execute(email, survey.title, variables, npsPath)
            return response.json(surveyUserAlreadyExists)
        }
        const surveyUser = surveysusersRepository.create({
            user_id: user.id,
            survey_id
        });
        await surveysusersRepository.save(surveyUser);

        await SendMailService.execute(email, survey.title, variables, npsPath);

        return response.status(201).json(surveyUser);
    }
}
export { SendMailController }