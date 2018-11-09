// server.js

// first we import our dependencies…
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';

import Compliment from './models/Compliment'

// and create our instances
const app = express();
const router = express.Router();

const API_PORT = process.env.API_PORT || 3001;

mongoose.connect("mongodb://localhost:27017/canary_compliments)", { useNewUrlParser: true })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

router.get('/', (_req, res) => {
    res.json({ message: 'Chirp, chirp! Any hear me singing?!' });
});

router.get('/compliments', (_req, res) => {
    Compliment.find((err, compliment) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: compliment });
    });
  });
  
  router.post('/compliments', (req, res) => {
    const compliment = new Compliment();
    // body parser lets us use the req.body
    const { text } = req.body;
    if (!text) {
      // we should throw an error. we can do this check on the front end
      return res.json({
        success: false,
        error: 'You must provide a compliment'
      });
    }
    compliment.text = text;
    compliment.save(err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  });

  router.put('/compliments/:complimentId', (req, res) => {
    const { complimentId } = req.params;
    if (!complimentId) {
      return res.json({ success: false, error: 'No compliemnt id provided' });
    }
    Compliment.findById(complimentId, (error, compliment) => {
      if (error) return res.json({ success: false, error });
      const { text } = req.body;
      if (text) compliment.text = text
      compliment.save(error => {
        if (error) return res.json({ success: false, error });
        return res.json({ success: true });
      });
    });
  });

  router.delete('/compliments/:complimentId', (req, res) => {
    const { complimentId } = req.params;
    if (!complimentId) {
      return res.json({ success: false, error: 'No compliment id provided' });
    }
    Compliment.remove({ _id: complimentId }, (error, _compliment) => {
      if (error) return res.json({ success: false, error });
      return res.json({ success: true });
    });
  });

app.use('/api', router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));

