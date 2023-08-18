const express = require('express');
const bodyParser = require('body-parser')

const app = express();

const postRoutes = require('./routes/posts')
const userRoutes = require('./routes/users')

app.use(bodyParser.json());
app.use('/posts', postRoutes)
app.use('/users', userRoutes)

module.exports = app