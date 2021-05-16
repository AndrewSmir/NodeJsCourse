import {
  BelongsToManyAddAssociationsMixin,
  BelongsToManyGetAssociationsMixin,
  DataTypes,
  Model,
  Optional,
  UUIDV4,
} from 'sequelize';
import { sequelize } from '../data-access/sequelize';
import { IEntity } from '../interfaces';
import { User } from './user';

type TPermissions = 'READ' | 'WRIGHT' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

interface IGroupAttributes extends IEntity {
  name: string;
  permissions: TPermissions[];
}

export type GroupCreationAttributes = Optional<IGroupAttributes, 'id'>;

export class Group
  extends Model<IGroupAttributes, GroupCreationAttributes>
  implements IGroupAttributes {
  readonly id;
  public name;
  public permissions;
  public addUsers: BelongsToManyAddAssociationsMixin<User, string>;
  public getUsers: BelongsToManyGetAssociationsMixin<User>;
}

Group.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permissions: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    paranoid: true,
    sequelize,
  },
);

Group.belongsToMany(User, { through: 'users-group' });
User.belongsToMany(Group, { through: 'users-group' });
