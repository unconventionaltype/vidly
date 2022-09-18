const Joi = require('joi');
const express = require('express');
const genres = require('./routes/genres');

const app = express();
const date = new Date();

app.use(express.json());
app.use('/api/genres', genres)


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