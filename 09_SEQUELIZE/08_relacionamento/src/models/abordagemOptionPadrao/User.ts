
import { DataTypes, Model } from 'sequelize';
import { db } from '../../mysqldb/connection';
import { defineModel } from './defineModel';

/* 
  com essa abordagem, conseguimos criar um modelo com opcoes padroes, e não precisamos lembrar a cada novo model de colocar o tiestamp false
  ou qualquer outra opção desejada
*/

class User extends Model { }
const UserModel = defineModel<User>(db, 'user', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  occupation: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  newsletter: {
    type: DataTypes.BOOLEAN,
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true,
    },
  },
});

//export default UserModel;