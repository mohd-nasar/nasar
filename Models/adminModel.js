const { DataTypes, Model } = require('sequelize');
const bcryptjs = require('bcryptjs');
const { shopiverse_db } = require('./../conn_db'); 

class Admin extends Model {
  async checkPassword(enteredPassword) {
    return bcryptjs.compare(enteredPassword, this.password);
  }
}

Admin.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize: shopiverse_db,  
  modelName: 'Admin',
  tableName: 'admins_info_table',
  hooks: {
    beforeSave: async (admin) => {
      if (admin.changed('password')) {
        admin.password = await bcryptjs.hash(admin.password, 12);
      }
    }
  }
});

module.exports = Admin;
