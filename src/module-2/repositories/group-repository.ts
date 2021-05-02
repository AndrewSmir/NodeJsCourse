import { IEntity, IGenericCRUDRepository } from '../interfaces';
import { Group } from '../models/group';

interface IPaginatedRepository<T extends IEntity> {
  getList(): Promise<T[]>;
}

interface IGroupRepository extends IGenericCRUDRepository<Group>, IPaginatedRepository<Group> {}

export class GroupRepository implements IGroupRepository {
  public async get(id: string): Promise<Group> {
    const group = await Group.findOne({
      where: {
        id,
      },
    });
    return group ? Promise.resolve(group) : Promise.reject({ message: 'Group not found' });
  }

  public async create({ name, permissions }: Group): Promise<Group> {
    const newGroup = await Group.create({ name, permissions });
    return newGroup;
  }

  //TODO Update method according to task
  public async delete(id: string): Promise<string> {
    const result = await Group.destroy({
      where: {
        id,
      },
      force: true,
    });
    return result === 1
      ? Promise.resolve('success')
      : Promise.reject({ message: 'Group not found' });
  }

  public async update({
    name,
    permissions,
    id,
  }: Pick<Group, 'name' | 'permissions' | 'id'>): Promise<Group> {
    const group = await Group.update(
      { name, permissions, id },
      {
        where: {
          id,
        },
        returning: true,
      },
    );
    return group[1][0]
      ? Promise.resolve(group[1][0])
      : Promise.reject({ message: 'Group not found' });
  }

  public async getList(): Promise<Group[]> {
    const groups = await Group.findAll();
    console.log(groups);
    return groups;
  }
}

export const groupRepositoryIns = new GroupRepository();
