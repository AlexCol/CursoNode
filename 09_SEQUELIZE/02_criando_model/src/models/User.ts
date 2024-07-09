import { DataTypes } from 'sequelize';
import { db } from '../mysqldb/connection';

/*Id é gerado altomaticamente. Se não desejar a forma generica (id como integer), pode-se criar assim:
  uuid: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4, // ou outra forma de gerar UUID
  },
-----ou apenas mmudar o nome
  userid: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
*/

const User = db.define('user', {
  userid: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  occupation: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  newsletter: {
    type: DataTypes.BOOLEAN
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true
    }
  }
}, {
  //timestamps: false //com isso em true ou não preenchido, vai ser criado dois campos, createdAt e updatedAt, 
  //mas deixar true os campos são monitorados automaticamente pelo sequelize
});

export default User;