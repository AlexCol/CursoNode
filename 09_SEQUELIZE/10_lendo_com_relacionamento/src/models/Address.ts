import { DataTypes } from 'sequelize';
import { db } from '../mysqldb/connection';
import User from './User';

const Address = db.define('address', {
  addressid: {
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
User.hasMany(Address, { //!informando que um usuário pode ter muitos endereços, senão o sequelize se perde
  onDelete: 'CASCADE',
  foreignKey: 'userid' //nome da coluna
});
/*
Address.belongsTo(User, {
  foreignKey: 'userid' //nome da coluna
});
*/

export default Address;