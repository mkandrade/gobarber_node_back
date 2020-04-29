/**
 * Rota: Receber a requisição
 * ou chamar outro arquivo, devolver uma resposta
 */

import { Router } from 'express';

import AuthUSerService from '../services/AuthUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authUser = new AuthUSerService();

  const { user, token } = await authUser.execute({
    email,
    password,
  });

  delete user.password;

  return response.json({ user, token });
});

export default sessionsRouter;
