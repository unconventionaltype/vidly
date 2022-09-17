const Joi = require('joi');
const express = require('express');

const app = express();
const date = new Date();
app.use(express.json());

//fake database
const genres = [
    {id: 1, name: 'Comedy'}
]


//routes
app.get('/api/genres', (req, res) => {
    res.send(genres);
});

app.post('/api/genres', (req, res) => {
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);
});


//input validation function
function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}

//open port listed in environment var PORT or 3000
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Lisening on port ${port} ${date}...`)
});