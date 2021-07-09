const express = require('express');
const router = express.Router();


const Movie = require('../models/Movie.js');

//Top 10 List 
router.get('/top10',(req,res,next)=>{
  const promise =  Movie.find({ }).limit(10).sort({imdb_score: -1});

  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  });
});

//tüm filmlerin getirilmesi

router.get('/', (req,res) =>{
    const promise =  Movie.find({ });

    promise.then((data)=>{
      res.json(data);
    }).catch((err)=>{
      res.json(err);
    });
});

//detaylı film getirilmesi
router.get('/:movie_id',(req,res,next)=>{
    const promise = Movie.findById(req.params.movie_id);

    promise.then((movie) =>{
      if(!movie)
        next({ message : 'The Movie Not found.' , code : '99' });

      res.json(movie);
    }).catch((err)=>{
      res.json(err);
    })
});

//Film güncelleme

router.put('/:movie_id',(req,res,next)=>{
  const promise = Movie.findByIdAndUpdate(
    req.params.movie_id,
    req.body,
    {
      new : true  
    }
    );

  promise.then((movie) =>{
    if(!movie)
      next({ message : 'The Movie Not found.' , code : '99' });

    res.json({status : 1});
  }).catch((err)=>{
    res.json(err);
  })
});

//silme işlemi
router.delete('/:movie_id',(req,res,next)=>{
  const promise = Movie.findByIdAndRemove(req.params.movie_id);

  promise.then((movie) =>{
    if(!movie)
      next({ message : 'The Movie Not found.' , code : '99' });

    res.json({status : 1});
  }).catch((err)=>{ 
    res.json(err);
  })
});

//between işlemi

router.get('/between/:start_year/:end_year', (req,res) =>{
  const { start_year, end_year} = req.params;
  const promise = Movie.find(
    {
      year : { "$gte" : parseInt(start_year), "$lte" : parseInt(end_year)}
    }
  );

  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  });


});



//film ekleme kısmı

router.post('/', (req, res, next) =>{
//Kirli Pislik Lanet KOD

  // const {title,imdb_score,category,country,year} = req.body;
  // const movie = new Movie({
  //   title : title,
  //   imdb_score : imdb_score,
  //   category : category,
  //   country : country,
  //   year : year
  // });
    // movie.save((err,data) =>{
    //   if(err)
    //     res.json(err);

    //   res.json(data);
    // });

    //Temiz KOD
    const movie = new Movie(req.body);
    const promise = movie.save();

    promise.then((data)=>{

      res.json({status : 1});
    }).catch((err)=>{
      res.json(err);
    });
});

module.exports = router;