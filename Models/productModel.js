const { DataTypes, Model } = require('sequelize');
const { shopiverse_db } = require('./../conn_db'); 

class Product extends Model {}

Product.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
  sequelize: shopiverse_db, 
  modelName: 'Product',
  tableName: 'products_info_table'
});

module.exports = Product;
