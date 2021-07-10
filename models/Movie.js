const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MovieSchema = new Schema({
     director_id : Schema.Types.ObjectId,
     title :{
          type: String,
          required: [true, '`{PATH}` alanı zorunludur.'],
          maxLength : [15, '`{PATH}` alanı (`{VALUE}`) , ({MAXLENGTH}) karakterden küçük olmalıdır.'],
          minLength : [2, '`{PATH}` alanı (`{VALUE}`) , ({MINLENGTH}) karakterden büyük olmalıdır.'],
     
     },
     category : {
          type : String,
          maxLength : 15,
          minLength : 2,
     },
     country : {
          type : String,
          maxLength : 15,
          minLength : 2,
     },
     year : {
          type : Number,
          maxLength : 2021,
          minLength : 1930,
     },
     imdb_score : {
          type : Number,
          maxLength : 10,
          minLength : 0,
     },
     date : {
          type : Date,
          default : Date.now
     }
});

module.exports = mongoose.model('movie', MovieSchema);

