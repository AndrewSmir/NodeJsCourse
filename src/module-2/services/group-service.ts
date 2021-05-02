import { groupRepositoryIns } from '../repositories/group-repository';
import { ICRUDService, IEntity } from '../interfaces';
import { Group } from '../models/group';

interface IPaginatedService<T extends IEntity> {
  list(limit: number): Promise<T[]>;
}

interface IGroupService extends ICRUDService<Group>, IPaginatedService<Group> {}

class GroupService implements IGroupService {
  public async create({ name, permissions }: Pick<Group, 'name' | 'permissions'>): Promise<Group> {
    return groupRepositoryIns.create(new Group({ name, permissions }));
  }

  public async delete(id: string): Promise<string> {
    return groupRepositoryIns.delete(id);
  }

  public async get(id: string): Promise<Group> {
    return groupRepositoryIns.get(id);
  }

  public async update({
    name,
    permissions,
    id,
  }: Pick<Group, 'name' | 'permissions' | 'id'>): Promise<Group> {
    return groupRepositoryIns.update({ name, permissions, id });
  }

  public async list(): Promise<Group[]> {
    return groupRepositoryIns.getList();
  }
}

export const groupService = new GroupService();
