const express = require('express');
const massive = require('massive');
const cors = require('cors');
const { json } = require('body-parser');
const { dbUser, dbPass } = require('./config');

const port = 3000;
const connectionString = `postgres://${dbUser}:${dbPass}@localhost/postgres`;

//<!=== App Declaration ===>
const app = express();

app.use(json());
app.use(cors());

//<!=== Invoke Massive ===>
const massiveConnection = massive(connectionString)
.then(dbInstance => {
  app.set('db', dbInstance); 
})
.catch(err => { 
  console.log(err); 
});

//<!=== Controllers ===>
const products_controller = require('./products_controller');

//<!=== Endpoints ===>
app.get('/api/products', products_controller.getAll);
app.get('/api/product/:id', products_controller.getOne);
app.put('/api/product/:id', products_controller.update);
app.post('/api/product', products_controller.create);
app.delete('/api/product/:id', products_controller.delete);


app.listen(port, () => {
  console.log(`Magic Happening on Port: ${port}`);
});