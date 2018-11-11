import mongoose from 'mongoose';
const Schema = mongoose.Schema;

//Obviously the Schema. This tells the server how the information that
//will be passed to and from the database will look.
const ComplimentSchema = new Schema({
  text: String}, 
{ timestamps: true });

//Exporting this schema module to the server.
export default mongoose.model('Compliment', ComplimentSchema);