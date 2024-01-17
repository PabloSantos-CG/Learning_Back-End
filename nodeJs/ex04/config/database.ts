import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://127.0.0.1:27017/myDbUsers")
  .then(() => console.log('conectado ao MongoDB'))
  .catch((err) => console.error(err));