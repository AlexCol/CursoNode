import { DataTypes } from 'sequelize';
import { db } from '../mysqldb/connection';
import User from './User';

const Address = db.define('address', {
  adressid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  street: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

//Adress tem usuario, assim o sequelize cria a FK
Address.belongsTo(User, {
  foreignKey: 'userid' //nome da coluna
});

export default Address;