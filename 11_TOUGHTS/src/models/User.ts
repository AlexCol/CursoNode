import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import db from '../db/connection';

//https://sequelize.org/docs/v6/core-concepts/model-basics/
class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id?: number; //deixar com ? pois sei que será criado pelo sequelize, mas não preciso informar no objeto
  declare name: string;
  declare email: string;
  declare password: string;
}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    sequelize: db,
    modelName: 'user' //nome que vai pro banco
  }
);

export default User;