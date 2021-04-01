import { IEntity, User } from '../models/user';
import { userRepositoryIns } from '../repositories/user-repository';
import { Validate } from '../decorators/validation';
import { userSchema } from '../validation-rules/user-validation-schema';

interface ICRUDService<T extends IEntity> {
  get(id: string): Promise<T>;
  create(data: Omit<T, 'id' | 'isDeleted'>): Promise<T>;
  update(data: T): Promise<T>;
  delete(id: string): Promise<T>;
}

interface IPaginatedService<T extends IEntity> {
  list(limit: number): Promise<T[]>;
}

interface IUserService extends ICRUDService<User>, IPaginatedService<User> {}

class UserService implements IUserService {
  @Validate(userSchema)
  public async create({ login, password, age }: Omit<User, 'id' | 'isDeleted'>): Promise<User> {
    return userRepositoryIns.create(new User(login, password, age));
  }

  public async delete(id: string): Promise<User> {
    return userRepositoryIns.delete(id);
  }

  public async get(id: string): Promise<User> {
    return userRepositoryIns.get(id);
  }

  @Validate(userSchema)
  public async update(data: User): Promise<User> {
    return userRepositoryIns.update(data);
  }

  public async list(limit: number): Promise<User[]> {
    return userRepositoryIns.getList(limit);
  }
}

export const userService = new UserService();
