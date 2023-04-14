const express = require('express');
const app = express();
const path = require('path');
const apiRouter = require('./routes/apiRouter.js');
const userRouter = require('./routes/userRouter.js');
const mongoose = require('mongoose');

//connect to mongo database
mongoose.connect('mongodb+srv://osp5:9dm8OGGfECIJmZdQ@cluster.zboxzus.mongodb.net/test')

//console.log DATABASE CONNECTED once connection is successful
mongoose.connection.once('open', () => {
  console.log('WE IN DIS DB');
});

const PORT = 3000;
// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//??not sure what this does (LOL honestly me neither --natalie)--BUT CRUCIAL
app.use(express.urlencoded({ extended: true }));


//designating /api as endpoint of apiRouter????????
app.use('/api', apiRouter);

//designating /user as endpoint leading to userRouter
app.use('/user', userRouter);

app.use(express.static(path.join(__dirname, '../index')));
app.get('/', (req, res) => {
  // res.status(200).sendFile(path.join(__dirname, '/index.html'));
  res.send('weinhere')
});

//ADD DASHBOARD ROUTE TO SERVE DASHBOARD UPON LOGIN??
app.get('/dashboard', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '/Dashboard.jsx'));
  // res.send('weinhere')
});

// Endpoint does not exist
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = app;
