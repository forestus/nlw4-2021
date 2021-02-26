import { Router } from "express";
import { SendMailController } from "./controllers/SendmailController";
import { SurveyController } from "./controllers/SurveyController";
import { UserController } from "./controllers/UserController";
const router = Router();

const userController = new UserController();
const surveyController = new SurveyController();
const sendMailController = new SendMailController();

//User
router.post("/users", userController.create);
//Survey
router.post("/survey", surveyController.create) 
router.get("/surveys", surveyController.show) 
//sendMail
router.post("/sendMail", sendMailController.execute) 


export { router };
