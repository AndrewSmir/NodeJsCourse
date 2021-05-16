import { Request, Response, Router } from 'express';
import { userService } from '../services/user-service';
import { USERS_PATH } from '../constants';
import { Delete, Get, Post, Put, TryCatch } from '../decorators';
import { User } from '../models/user';

export const userRouter = Router();

class UserController {
  @Get(USERS_PATH, userRouter)
  @TryCatch
  public async get(req: Request, res: Response<User>): Promise<void> {
    const id = req.query.id as string;
    const user = await userService.get(id);
    res.json(user);
  }

  @Post(USERS_PATH, userRouter)
  @TryCatch
  public async create(req: Request, res: Response<User>): Promise<void> {
    const { login, password, age } = req.body as User;
    const user = await userService.create({ login, password, age });
    res.send(user);
  }

  @Put(USERS_PATH, userRouter)
  @TryCatch
  public async update(req: Request, res: Response<User>): Promise<void> {
    const { id, age, login, password } = req.body as Omit<User, 'isDeleted'>;
    const user = await userService.update({ id, login, password, age, isDeleted: false });
    res.send(user);
  }

  @Delete(USERS_PATH, userRouter)
  @TryCatch
  public async delete(req: Request, res: Response<User>): Promise<void> {
    const { id } = req.body as Pick<User, 'id'>;
    const user = await userService.delete(id);
    res.send(user);
  }

  @Post(`${USERS_PATH}/list`, userRouter)
  @TryCatch
  public async list(req: Request, res: Response<User[]>): Promise<void> {
    const { limit } = req.body as { limit: number };
    const users = await userService.list(limit);
    res.send(users);
  }
}
