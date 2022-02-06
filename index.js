const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config({path: './config/.env'});
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');

//DB CONNECTION
mongoose.connect(
    process.env.DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
.then(app.listen(PORT, () => console.log(`Server running on PORT ${PORT}.`)) )
.catch( () => console.log('Db not connected.') );

//MIDDLEWARES
app.use(bodyParser.json());

//IMPORT ROUTES
const userRoutes = require('./router/user.router');
const crudRoutes = require('./router/crud.router');
const resetRoutes = require('./router/reset.router');

//ROUTES MIDDLEWARES
app.use('/user', userRoutes);
app.use('/crud', crudRoutes);
app.use('/reset', resetRoutes);