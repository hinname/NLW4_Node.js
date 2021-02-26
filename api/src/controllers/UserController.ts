import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';

class UserController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body;
    
    const usersRepository = getCustomRepository(UsersRepository); //repository é um entity manager

    const userAlreadyExists = await usersRepository.findOne({
      email
    });

    if(userAlreadyExists) {
      return response.status(400).json({
        error: "User already exists!",
      });
    }

    const user = usersRepository.create({
      name, email
    })

    await usersRepository.save(user); //retorna uma promise de user, por isso o uso do await

    return response.status(201).json(user);
  }
}

export { UserController };
