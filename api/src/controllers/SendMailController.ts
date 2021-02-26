import { Request, Response } from "express";
import { getCustomRepository, RepositoryNotTreeError } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import SendMailService from "../services/SendMailService";
import { resolve } from 'path';

class SendMailController {
  async execute( request: Request, response: Response ) {
    const { email, survey_id } = request.body;

    const usersRepository = getCustomRepository(UsersRepository);
    const surveysRepository = getCustomRepository(SurveysRepository)
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

    const userAlreadyExists = await usersRepository.findOne({email});

    if(!userAlreadyExists) {
      return response.status(400).json({
        error: "User does not exists",
      });
    }

    const survey = await surveysRepository.findOne({id : survey_id});

    if(!survey) {
      return response.status(400).json({
        error: "Survey does not exists",
      })
    }

    //Variaveis para SendMailService
    const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs")
    

    //encontrar as survey_users que já tem um user id e valor nulo
    const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
      where: {user_id: userAlreadyExists.id, value: null}, //and
      relations: ["user", "survey"]
    });

    const variables = {
      name: userAlreadyExists.name,
      title: survey.title,
      description: survey.description,
      id: "",
      link: process.env.URL_MAIL
    }

    //com isso ele executa o SendMailService sem criar registro na tabela surveys_users
    if(surveyUserAlreadyExists) {
      variables.id = surveyUserAlreadyExists.id;
      await SendMailService.execute(email, survey.title, variables, npsPath)
      return response.json(surveyUserAlreadyExists);
    }

    //Salvar as informações na tabela surveyUser
    const surveyUser = surveysUsersRepository.create({
      user_id: userAlreadyExists.id,
      survey_id
    })
    

    await surveysUsersRepository.save(surveyUser);

    //Enviar e-mail para o usuário
    variables.id = surveyUser.id;

    await SendMailService.execute(email, survey.title, variables, npsPath)

    return response.json(surveyUser);
  }
}

export { SendMailController }