const express = require('express');
const app = express();
const cors = require('cors');
const todoRoutes = require('./routes/todos');

app.use(cors());
app.use(express.json());
app.use('/todos', todoRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});