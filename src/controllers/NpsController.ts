import { Request, Response } from "express";
import { getCustomRepository, Not, IsNull } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class NpsController {
    async execute(request: Request, response: Response) {
        const { survey_id } = request.params;
        //request params é obrigatório passar(Route Params). 
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveysUsers = await surveysUsersRepository.find({
            survey_id,
            value: Not(IsNull())//faz com que valores NULL não seram retornados no find(ou seja só busca os valores).
        })
        //promoter detractor passive
        const detractors = surveysUsers.filter(
            (survey) => survey.value >= 0 && survey.value <= 6
        ).length;
        const passives = surveysUsers.filter(
            (survey) => survey.value >= 7 && survey.value <= 8
        ).length;
        const promoters = surveysUsers.filter(
            (survey) => survey.value >= 9 && survey.value <= 10
        ).length;
        const totalAnswer = surveysUsers.length;
        const calculate = Number((((promoters - detractors) / totalAnswer) * 100).toFixed(2));
        // toFixed(2) >>>faz com que o numero com virgula ex"33,333333" 
        //só retorne 2 numeros apos a virgula ou seja "33,33" porém ele retorna uma string
        return response.json({
            detractors,
            passives,
            promoters,
            totalAnswer,
            nps: calculate,

        })
    }
}

export { NpsController }