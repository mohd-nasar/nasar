const db = require('./conn_db.js')
const adminRoutes = require('./Routes/adminRoutes.js')
const productRoutes = require('./Routes/productRoutes.js')
const express = require('express')
const cors = require('cors')
const path = require('path')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const exp = require('constants')
dotenv.config({path:'./config.env'})
const { Pool } = require('pg'); // Import Pool from pg


const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
  })

  // Test the connection
pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    console.log('Connected to the database');
    release(); // release the client back to the pool
  });

// Function to sync database
// const syncDatabase = async () => {
//     try {
//         await db.shopiverse_db.sync({ force: false }); // Set to true to drop existing tables
//         console.log('Database & tables created!');
//     } catch (error) {
//         console.error('Error syncing database:', error);
//     }
// };

// db_user = postgres
// db_host = localhost
// db_database = shopiverse
// db_password = root
// db_port = 5432

// Test database connection and sync
const testConnection = async () => {
    try {
        await db.shopiverse_db.authenticate();
        console.log('Connection has been established successfully.');
        await syncDatabase();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

// Call the connection test to start the process
testConnection();

db.shopiverse_db.authenticate()
    .then(()=>console.log("Connected to Database"))
    .catch(err=>console.log(`Error ` + err))

app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())


app.get('/',(req,res)=>{
    res.status(200).json({
        message: "Api is working !!!"
    })
})
app.use('/api/v1/admin',adminRoutes)
app.use('/api/v1/products',productRoutes)

const port = process.env.port
app.listen(port,()=>{
    console.log(`App running on http://localhost:${port}`)
})
