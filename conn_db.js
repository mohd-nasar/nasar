const Sequelize = require('sequelize')
const dotenv = require('dotenv')
dotenv.config({path:'./config.env'})

const shopiverse_db = new Sequelize(process.env.db_database,process.env.db_user,process.env.db_password,{
    host : process.env.db_host,
    dialect : 'postgres',
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,  // Allows self-signed certificates
        },
    },    
    operatersAliases : false,
    pool : {
        max : 5, 
        min : 0 , 
        acquire : 3000,
        idle : 1000
    },

});

module.exports = {
    shopiverse_db
}
