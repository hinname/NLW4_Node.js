import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import * as yup from 'yup';
import { AppError } from '../errors/AppError';

class UserController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body;

    const schema = yup.object().shape({
      name: yup.string().required("Nome é obrigatório"),
      email: yup.string().email().required("Email incorreto")
    })

    //if(!(await schema.isValid(request.body))) {
      //
    //}

    try {
      await schema.validate(request.body, { abortEarly: false })
    }catch(err) {
      throw new AppError(err)
    }
    
    const usersRepository = getCustomRepository(UsersRepository); //repository é um entity manager

    const userAlreadyExists = await usersRepository.findOne({
      email
    });

    if(userAlreadyExists) {
      throw new AppError("User already exists")
    }

    const user = usersRepository.create({
      name, email
    })

    await usersRepository.save(user); //retorna uma promise de user, por isso o uso do await

    return response.status(201).json(user);
  }
}

export { UserController };
