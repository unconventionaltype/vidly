const express = require('express');
const router = express.Router();

//fake database
const genres = [
    {id: 1, name: 'Action'},
    {id: 2, name: 'Action'},
    {id: 3, name: 'Action'}
];

//routes

//responds with list of all genres
router.get('/', (req, res) => {
    res.send(genres);
});

//adds a genre to the list
router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id))
    if (!genre) res.status(404).send('not found')

    const {error} = validateGenre(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    genre.name = req.body.name
    res.send(genre);
})

//deletes a genre
router.delete('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) res.status(404).send('not found');

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);
})

module.exports = router;