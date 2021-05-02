import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../data-access/sequelize';
import { IEntity } from '../interfaces';

interface IUser extends IEntity {
  login: string;
  password: string;
  age: number | null;
  isDeleted: boolean;
}

export class User extends Model<IUser, Omit<IUser, 'id' | 'isDeleted'>> implements IUser {
  readonly id = Date.now().toString();
  public login;
  public password;
  public age;
  public isDeleted;
}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: 'users',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    sequelize,
  },
);
