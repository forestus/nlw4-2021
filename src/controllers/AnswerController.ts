import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class AnswerController {
    async execute(request: Request, response: Response) {
        const { value } = request.params;
        const { u } = request.query;//todo query params PODE RETORNAR UNDEFINED(sempre forçar o valor a ser o esperado e fazer verificação), Query params nem sempre retorna um valor e não é obrigatório inserir o mesmo como valor na rota, ele é como opção para retornar certo valor caso necessário.
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u)//força o "u" a ser um valor em string que é oque o id espera
        });
        if (!surveyUser) {
            throw new AppError("SurveyUser does not exists")
        }

        surveyUser.value = Number(value);
        await surveysUsersRepository.save(surveyUser);

        return response.json(surveyUser)
    }
}
export { AnswerController }