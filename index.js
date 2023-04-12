const express = require('express');
const app = express();
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    // port: 3308,
    user: 'root',
    password: 'sqldb',
    database: 'mydata'
  }
});

app.use(express.json());

app.get('/api/users', async (req, res) => {
  const users = await knex.select().from('users');
  res.send(users);
});

app.get('/api' ,(req,res)=>{
    res.send('api is working')
})

app.post('/api/users', async (req, res) => {
  const user = req.body;
  await knex('users').insert(user);
  res.send(user);
});

app.get('/api/users/:id', async(req,res)=>{
  const id = req.params.id
  const user = await knex('users').where('id',id)
  res.send(user)
})

app.put('/api/users/:id', async (req, res) => {
  const id = req.params.id;
  const user = req.body;
  await knex('users').where('id', id).update(user);
  res.send(user);
});

app.delete('/api/users/:id', async (req, res) => {
  const id = req.params.id;
  await knex('users').where('id', id).del();
  res.send('User deleted successfully');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
