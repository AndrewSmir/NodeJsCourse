import { Request, Response, Router } from 'express';
import { GROUP_PATH } from '../constants';
import { Delete, Get, Post, Put, TryCatch } from '../decorators';
import { Group } from '../models/group';
import { groupService } from '../services/group-service';

export const groupRouter = Router();

class GroupController {
  @Get(GROUP_PATH, groupRouter)
  @TryCatch
  public async get(req: Request, res: Response<Group>): Promise<void> {
    const id = req.query.id as string;
    const group = await groupService.get(id);
    res.json(group);
  }

  @Post(GROUP_PATH, groupRouter)
  @TryCatch
  public async create(req: Request, res: Response<Group>): Promise<void> {
    const { name, permissions } = req.body as Group;
    const group = await groupService.create({ name, permissions });
    res.send(group);
  }

  @Put(GROUP_PATH, groupRouter)
  @TryCatch
  public async update(req: Request, res: Response<Group>): Promise<void> {
    const { id, name, permissions } = req.body as Pick<Group, 'id' | 'name' | 'permissions'>;
    const group = await groupService.update({ id, name, permissions });
    res.send(group);
  }

  @Delete(GROUP_PATH, groupRouter)
  @TryCatch
  public async delete(req: Request, res: Response<string>): Promise<void> {
    const { id } = req.body as Pick<Group, 'id'>;
    const result = await groupService.delete(id);
    res.send(result);
  }

  @Post(`${GROUP_PATH}/list`, groupRouter)
  @TryCatch
  public async list(req: Request, res: Response<Group[]>): Promise<void> {
    const group = await groupService.list();
    res.send(group);
  }
  @Post(`${GROUP_PATH}/add`, groupRouter)
  @TryCatch
  public async addUsers(req: Request, res: Response<string>): Promise<void> {
    const { groupId, usersId } = req.body as { groupId: string; usersId: string[] };
    await groupService.addUsers(groupId, usersId);
    res.send(`Users ${usersId.join(', ')} added to group ${groupId}`);
  }
}
