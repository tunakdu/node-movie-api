const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//Models

const Director = require('../models/Director');

router.post('/', (req, res, next) => {

     const director = new Director(req.body);

     const promise = director.save();

     promise.then((data) => {
          res.json(data);
     }).catch((err) => {
          res.json(err);
     });
});

router.get('/', (req, res, next) => {

     const promise = Director.aggregate([{
               $lookup: {
                    from: 'movies',
                    localField: '_id',
                    foreignField: 'director_id',
                    as: 'movies'
               }
          },
          {
               $unwind: {
                    path: '$movies',
                    preserveNullAndEmptyArrays: true
               }
          },
          {
               $group: {
                    _id: {
                         _id: '$_id',
                         name: '$name',
                         surname: '$surname',
                         bio: '$bio'
                    },
                    movies: {
                         $push: '$movies'
                    }
               }
          },
          {
               $project: {
                    _id: '$_id._id',
                    name: '$_id.name',
                    surname: '$_id.surname',
                    bio: '$_id.bio',
                    movies: '$movies'
               }
          }
     ]);

     promise.then((data) => {
          res.json(data);
     }).catch((err) => {
          res.json(err);
     })
});


router.get('/:director_id', (req, res, next) => {

     const promise = Director.aggregate([{
               $match: {
                    '_id': mongoose.Types.ObjectId(req.params.director_id)
               }
          },
          {
               $lookup: {
                    from: 'movies',
                    localField: '_id',
                    foreignField: 'director_id',
                    as: 'movies'
               }
          },
          {
               $unwind: {
                    path: '$movies',
                    preserveNullAndEmptyArrays: true
               }
          },
          {
               $group: {
                    _id: {
                         _id: '$_id',
                         name: '$name',
                         surname: '$surname',
                         bio: '$bio'
                    },
                    movies: {
                         $push: '$movies'
                    }
               }
          },
          {
               $project: {
                    _id: '$_id._id',
                    name: '$_id.name',
                    surname: '$_id.surname',
                    bio: '$_id.bio',
                    movies: '$movies'
               }
          }
     ]);

     promise.then((data) => {
          res.json(data);
     }).catch((err) => {
          res.json(err);
     })
});

//Film g??ncelleme

router.put('/:director_id', (req, res, next) => {
     const promise = Director.findByIdAndUpdate(
          req.params.director_id,
          req.body, {
               new: true
          }
     );

     promise.then((director) => {
          if (!director)
               next({
                    message: 'The Direct Not found.',
                    code: '99'
               });

          res.json({
               status: 1
          });
     }).catch((err) => {
          res.json(err);
     })
});

module.exports = router;