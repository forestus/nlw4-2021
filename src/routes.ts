import { Router } from "express";
import { AnswerController } from "./controllers/AnswerController";
import { NpsController } from "./controllers/NpsController";
import { SendMailController } from "./controllers/SendmailController";
import { SurveyController } from "./controllers/SurveyController";
import { UserController } from "./controllers/UserController";
const router = Router();

const userController = new UserController();
const surveyController = new SurveyController();
const sendMailController = new SendMailController();
const answerController = new AnswerController();
const npsController = new NpsController();
//User
router.post("/users", userController.create);
//Survey
router.post("/survey", surveyController.create)
router.get("/surveys", surveyController.show)
//sendMail
router.post("/sendMail", sendMailController.execute)
//Answer
router.get("/answers/:value", answerController.execute)
//NPS
router.get("/nps/:survey_id", npsController.execute)



export { router };
