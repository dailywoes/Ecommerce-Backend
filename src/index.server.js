/*
Author: John Tex
Email: johnrteixeira@gmail.com
Description: This is the index of the backend, it connects to the mongodb server,
             and then attaches the api request routes with the express library.
 */

//libraries
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const cors = require('cors');

//environment variables
const env = require('dotenv');
env.config();

//route variables
const app = express();
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');

//mongodb connection, connecting to the database
//mongodb://root:<password>@cluster0.wsooy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@cluster0.wsooy.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
).then(() => {
    console.log('Database connected')
});

//api routes
app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);

//log the port of the application
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});