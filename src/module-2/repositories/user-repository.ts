import { IEntity, User } from '../models/user';
import { SeqUser } from '../models/seqUser';

interface IGenericCRUDRepository<T extends IEntity> {
  create(user: T): Promise<T>;
  get(id: string): Promise<T>;
  update(user: Omit<T, 'isDeleted'>): Promise<T>;
  delete(id: string): Promise<T>;
}

interface IPaginatedRepository<T extends IEntity> {
  getList(limit: number): Promise<T[]>;
}

interface IUserRepository extends IGenericCRUDRepository<User>, IPaginatedRepository<User> {}

export class UserRepository implements IUserRepository {
  public async get(id: string): Promise<User> {
    const user = await SeqUser.findOne({
      where: {
        id,
      },
    });
    return user ? Promise.resolve(user) : Promise.reject({ message: 'User not found' });
  }

  public async create(user: User): Promise<User> {
    const newUser = await SeqUser.create(user);
    return newUser;
  }

  public async delete(id: string): Promise<User> {
    const user = await SeqUser.update(
      { isDeleted: true },
      {
        where: {
          id,
        },
        returning: true,
      },
    );
    return user[1][0] ? Promise.resolve(user[1][0]) : Promise.reject({ message: 'User not found' });
  }

  public async update({ age, id, login, password }: Omit<User, 'isDeleted'>): Promise<User> {
    const user = await SeqUser.update(
      { login, password, age },
      {
        where: {
          id,
        },
        returning: true,
      },
    );
    return user[1][0] ? Promise.resolve(user[1][0]) : Promise.reject({ message: 'User not found' });
  }

  public async getList(limit: number): Promise<User[]> {
    const users = await SeqUser.findAll();
    return users.sort((a, b) => (a.login > b.login ? 1 : -1)).slice(0, limit);
  }
}

export const userRepositoryIns = new UserRepository();
