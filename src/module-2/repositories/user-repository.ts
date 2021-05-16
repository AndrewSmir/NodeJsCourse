import { IEntity, IGenericCRUDRepository } from '../interfaces';
import { User } from '../models/user';

interface IPaginatedRepository<T extends IEntity> {
  getList(limit: number): Promise<T[]>;
}

interface IUserRepository extends IGenericCRUDRepository<User>, IPaginatedRepository<User> {}

export class UserRepository implements IUserRepository {
  public async get(id: string): Promise<User> {
    const user = await User.findOne({
      where: {
        id,
      },
    });
    return user ? Promise.resolve(user) : Promise.reject({ message: 'User not found' });
  }

  public async create({ login, password, age }: User): Promise<User> {
    const newUser = await User.create({ login, password, age });
    return newUser;
  }

  public async delete(id: string): Promise<User> {
    const user = await User.update(
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

  public async update({
    age,
    id,
    login,
    password,
  }: Pick<User, 'id' | 'login' | 'password' | 'age'>): Promise<User> {
    const user = await User.update(
      { login, password, age, id },
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
    const users = await User.findAll();
    return users.sort((a, b) => (a.login > b.login ? 1 : -1)).slice(0, limit);
  }
}

export const userRepositoryIns = new UserRepository();
