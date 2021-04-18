import { DataTypes, Model } from 'sequelize';
import { IEntity } from './user';
import { sequelize } from '../data-access/sequelize';

export class SeqUser extends Model implements IEntity {
  readonly id: string;
  public login: string;
  public password: string;
  public age: number;
  public isDeleted: boolean;
}

SeqUser.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
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
