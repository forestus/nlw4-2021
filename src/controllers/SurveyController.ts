import { Request, Response } from "express"
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysRepository } from "../repositories/SurveysRepository";

class SurveyController {
    async create(request: Request, response: Response) {
        const { title, description } = request.body;
        const surveysRepository = getCustomRepository(SurveysRepository)
        const surveyAreadyExists = await surveysRepository.findOne({ title })
        if (surveyAreadyExists) {
            throw new AppError("this Survey Already Exists!")
        }
        const survey = surveysRepository.create({
            title, description
        });
        await surveysRepository.save(survey);
        return response.status(201).json(survey);
    }
    async show(request: Request, response: Response) {
        const surveysRepository = getCustomRepository(SurveysRepository)
        const all = await surveysRepository.find();
        return response.json(all);
    }
}

export { SurveyController }