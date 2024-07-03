const http = require('http');
const express = require('express');
const usersRouter = require('./routes/users/usersRouter');
const { notFound, globalErrHandler } = require('./middlewares/globalErrorHandler');
const categoryRouter = require('./routes/category/categoryRouter');
require('./config/database')();
const dotenv = require("dotenv");
const postsRouter = require('./routes/post/postRouter');
const commentRouter = require('./routes/comment/commentRouter');
dotenv.config();

const app = express();
//middlewares
app.use(express.json()); //Pass incoming data

// Routes
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/categories', categoryRouter)
app.use('/api/v1/posts', postsRouter)
app.use('/api/v1/comments', commentRouter)
//? Not Found middleware
app.use(notFound);
// Error Handler
app.use(globalErrHandler);

const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});