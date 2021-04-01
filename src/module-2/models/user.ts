export interface IEntity {
  readonly id: string;
}

export class User implements IEntity {
  readonly id: string;
  public login: string;
  public password: string;
  public age: number;
  public isDeleted: boolean;

  constructor(login: string, password: string, age: number, isDeleted?: boolean) {
    this.id = Date.now().toString();
    this.login = login;
    this.password = password;
    this.age = age;
    this.isDeleted = Boolean(isDeleted);
  }
}
