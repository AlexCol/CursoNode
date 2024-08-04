import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import db from '../db/connection';
import User from './User';

//https://sequelize.org/docs/v6/core-concepts/model-basics/
class Tought extends Model<InferAttributes<Tought>, InferCreationAttributes<Tought>> {
  declare id?: number; //deixar com ? pois sei que será criado pelo sequelize, mas não preciso informar no objeto
  declare title: string;
}

Tought.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize: db,
    modelName: 'tought'
  }
);

Tought.belongsTo(User, {
  foreignKey: 'userid' //nome da coluna
});

export default Tought;