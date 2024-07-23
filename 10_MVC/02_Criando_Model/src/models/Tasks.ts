import { DataTypes } from 'sequelize';
import db from '../db/connection';
import { title } from 'process';

const Task = db.define('task', {
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
    allowNull: false
  }
}, {
  //timestamps: false //com isso em true ou não preenchido, vai ser criado dois campos, createdAt e updatedAt, 
  //mas deixar true os campos são monitorados automaticamente pelo sequelize
});

export default Task;