import {
  BelongsToManyAddAssociationMixin,
  DataTypes,
  HasManyGetAssociationsMixin,
  Model,
  Optional,
  UUIDV4,
} from 'sequelize';
import { sequelize } from '../data-access/sequelize';
import { IEntity } from '../interfaces';
import { Group } from './group';

interface IUserAttributes extends IEntity {
  login: string;
  password: string;
  age: number | null;
  isDeleted: boolean;
}

type UserCreationAttributes = Optional<IUserAttributes, 'id' | 'isDeleted'>;

export class User
  extends Model<IUserAttributes, UserCreationAttributes>
  implements IUserAttributes {
  readonly id;
  public login;
  public password;
  public age;
  public isDeleted;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
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
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    sequelize,
  },
);

//User.sync({ force: true }).then(() => console.log('OK'));
