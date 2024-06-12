const http = require('http');
const express = require('express');
const usersRouter = require('./routes/users/usersRouter');
require('./config/database')();

const app = express();

// Routes
app.use('/', usersRouter)

const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});