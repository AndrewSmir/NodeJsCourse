export interface IEntity {
  readonly id: string;
}

export interface IGenericCRUDRepository<T extends IEntity> {
  create(data: T): Promise<T>;
  get(id: string): Promise<T>;
  update(data: T): Promise<T>;
  delete(id: string): Promise<T> | Promise<string>;
}

export interface ICRUDService<T extends IEntity> {
  get(id: string): Promise<T>;
  create(data: T): Promise<T>;
  update(data: T): Promise<T>;
  delete(id: string): Promise<T> | Promise<string>;
}
