//Gotta import everything this server will
//need to run.
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';

import Compliment from './models/Compliment'

//'Hey express module! Make me a router so I can send info back and forth!'
const app = express();
const router = express.Router();

//Use humans need a way to see that info. 
const API_PORT = process.env.API_PORT || 3001;

//Here's where to find the info.
mongoose.connect('mongodb://localhost:27017/canary_compliments)', { useNewUrlParser: true })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

//I use this to make sure I'm going in the right direction when I'm 
//setting up the server.
router.get('/', (_req, res) => {
    res.json({ message: 'Chirp, chirp! Any hear me singing?!' });
});

//Do you have any compliments? If yes, give 'em to me. If I've made an error,
//let me know.
router.get('/compliments', (_req, res) => {
    Compliment.find((err, compliment) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: compliment });
    });
  });
  
//Give the database some compliments.
  router.post('/compliments', (req, res) => {
    const compliment = new Compliment();
    //Helps the database decipher what it'll be receiving.
    const { text } = req.body;
    if (!text) {
      //You're suppose to give the database some 'data'.
      //That's why it's called a database.
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

  //Hey database, I wanna edit that compliment. Oh, here's its ID,
  //that should help you find it.
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

  //Yeah, I just want to get rid of that compliment. Here's its ID,
  //now make it disappear.
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

