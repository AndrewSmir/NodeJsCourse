import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../data-access/sequelize';
import { IEntity } from '../interfaces';

type TPermissions = 'READ' | 'WRIGHT' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

interface IGroup extends IEntity {
  name: string;
  permissions: TPermissions[];
}

export class Group extends Model<IGroup, Omit<IGroup, 'id'>> implements IGroup {
  readonly id = Date.now().toString();
  public name;
  public permissions;
}

Group.init(
  {
    id: {
      type: DataTypes.STRING,
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
    tableName: 'groups',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    paranoid: true,
    sequelize,
  },
);

//Group.sync({ force: true }).then(() => console.log('OK'));
