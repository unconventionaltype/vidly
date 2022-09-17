const Joi = require('joi');
const express = require('express');

const app = express();
const date = new Date();
app.use(express.json());

//fake database
const genres = [
    {id: 1, name: 'Comedy'}
];


//routes

//responds with list of all genres
app.get('/api/genres', (req, res) => {
    res.send(genres);
});

//adds a genre to the list
app.post('/api/genres', (req, res) => {
    const {error} = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);
});

//updates existing genre
app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id))
    if (!genre) res.status(404).send('not found')

    const {error} = validateGenre(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    genre.name = req.body.name
    res.send(genre);
})

//deletes a genre
app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) res.status(404).send('not found');

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);
})


//input validation function
function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    console.log(schema.validate(genre))
    return schema.validate(genre);
};

//open port listed in environment var PORT or 3000
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Lisening on port ${port} ${date}...`);
});