/**
 * Rota: Receber a requisição
 * ou chamar outro arquivo, devolver uma resposta
 */

import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

import ensureAuthenticated from '../middleware/ensureAuthenticated';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    //Para password não retornar no objeto
    delete user.password;

    return response.status(200).json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.patch('/avatar', ensureAuthenticated, async (request, response) => {
  return response.json({ ok: true });
});
export default usersRouter;
