import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: String;
}

class AuthUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepo = getRepository(User);

    const user = await usersRepo.findOne({
      where: { email },
    });

    if (!user) {
      throw new AppError('Incorrect Credentials, email/password', 401);
    }

    // string / Hash
    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect Credentials, email/password', 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthUserService;
