const express = require('express');
const path = require('path');
const sequelize = require('./util/database');
require('dotenv').config();



const app = express();
const port = 3000; 
const cors = require('cors');

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const carRoutes = require('./routes/carRoutes');
const openinghoursRoutes = require('./routes/openinghoursRoutes'); 
const employeesRoutes = require('./routes/employeesRoutes');

app.use(cors());






app.use('/api/cars', carRoutes);
app.use('/api/openinghours', openinghoursRoutes); 
app.use('/api/employees', employeesRoutes);

app.use(express.static(path.join(__dirname,'build')))
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname,'build','index.html'))
});


sequelize
.sync()
.then(result => {
  console.log("Database connected");
  app.listen(3000);
})
.catch(err => console.log('Une erreur est survenue', err));