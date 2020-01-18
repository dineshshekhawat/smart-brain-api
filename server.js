const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'root',
        database: 'smartbrain'
    }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {res.json('It is working'); });
app.post('/signin', signin.handleSignIn(db , bcrypt) );
app.post('/register', register.handleRegister(db, bcrypt) );
app.get('/profile/:id', profile.handleProfileGet(db) );
app.put('/image', image.handleImage(db));
app.post('/imageUrl', image.handleApiCall);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`)
});
