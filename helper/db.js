

const mongoose = require('mongoose');

module.exports = () => {
     mongoose.connect("mongodb+srv://tunakdu:30918qwer@tunakdu.xxmt7.mongodb.net/movie-api?retryWrites=true&w=majority", {useNewUrlParser : true});

     mongoose.connection.on('open', () =>{
          console.log("mongoDB: Connection");
     });

     mongoose.connection.on('error', (err) =>{
          console.log("mongoDB: Error",err);
     });

     mongoose.Promise = global.Promise;

};