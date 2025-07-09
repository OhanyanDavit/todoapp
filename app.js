const express = require('express');
const mongoose = require('mongoose');
const Todo = require('./models/Todo');
const path = require('path');

const PORT =7890; 

const app = express();


mongoose.connect("mongodb://localhost:27017/dbtodo1")
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));// Parse URL-encoded bodies


app.use(express.json());

app.get('/', async (req, res) => {
    res.sendFile(__dirname + '/views/index.html'); // Serve the HTML file
});


app.get('/data', async (req, res) => {
  const todos = await Todo.find().sort({ createdAt: -1 });
  res.json(todos);
});


app.post('/add', async (req, res) => {
    const todo = new Todo(req.body);
    await Todo.create({ task: req.body.task });
    res.redirect('/');
});



app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
