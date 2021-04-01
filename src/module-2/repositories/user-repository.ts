import { IEntity, User } from '../models/user';
import { usersList } from '../storage';

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
  private storage: User[];

  constructor(storage: User[]) {
    this.storage = storage;
  }

  public get(id: string): Promise<User> {
    const user = this.storage.find((user) => user.id === id);
    return user ? Promise.resolve(user) : Promise.reject({ message: 'User not found' });
  }

  public async create(user: User): Promise<User> {
    this.storage.push(user);
    return user;
  }

  public async delete(id: string): Promise<User> {
    const user = await this.get(id);
    user.isDeleted = true;
    return user;
  }

  public async update({ age, id, login, password }: Omit<User, 'isDeleted'>): Promise<User> {
    const user = await this.get(id);
    user.age = age;
    user.password = password;
    user.login = login;
    return user;
  }

  public async getList(limit: number): Promise<User[]> {
    return this.storage.sort((a, b) => (a.login > b.login ? 1 : -1)).slice(0, limit);
  }
}

export const userRepositoryIns = new UserRepository(usersList);
