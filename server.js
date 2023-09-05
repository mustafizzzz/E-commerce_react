const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv')
const morgan = require('morgan');
const connectDB = require('./config/db');
const authRout = require('./routes/authRout')
const categoryRoutes = require('./routes/categoryRoutes')
const productRoutes = require('./routes/productRoutes')
const cors = require('cors');


//configure env
dotenv.config()

//database config
connectDB();

//rest object
const app = express()

//middleware
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/v1/auth', authRout)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/product', productRoutes)


//rest api creates
app.get('/', (req, res) => {
  res.send("<h1>Welcome to Ecommerce App</h1>")

})

//PORT

const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`.bgGreen.white);
})