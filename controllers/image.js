const Clarifai = require('clarifai');

const API_KEY = process.env.CLARIFAI_API_KEY;
const app = new Clarifai.App({
    apiKey: API_KEY
});

const handleApiCall = (req, res) => {
    console.log('API_KEY', API_KEY);
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err =>  {
            console.log('Clarifai Error Reponse', err);
            res.status(400).json('Unable to work with API')
        });
}

const handleImage = (db) => (req, res) => {
    const { id } = req.body;
    
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('Unable to get entries'));;
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
};