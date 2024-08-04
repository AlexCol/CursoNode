import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import db from '../db/connection';

//https://sequelize.org/docs/v6/core-concepts/model-basics/
class Task extends Model<InferAttributes<Task>, InferCreationAttributes<Task>> {
  declare id?: number; //deixar com ? pois sei que será criado pelo sequelize, mas não preciso informar no objeto
  declare title: string;
  declare description: string;
  declare done?: boolean;
}

Task.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    done: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  {
    sequelize: db,
    modelName: 'task'
  }
);

export default Task;