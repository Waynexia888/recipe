const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const UserFood = require('../../models/UserFood');
const validateFoodInput = require('../../validation/userFoods');


router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    UserFood.find({ user: req.user.id })
        .then(userFoods => res.json(userFoods))
        .catch(err =>
            res.status(404).json({ noFoodsFound: 'No foods found from that user' }
            )
        );
});

router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateFoodInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const newFood = new UserFood({
            name: req.body.name,
            expirationDate: req.body.expirationDate,
            createdAt: req.body.createdAt,
            user: req.user.id
        });

        newFood.save().then(food => res.json(food))
                        .catch(err => 
                            res.status(422).json({uniqueness: 'User can only have one of each food'}
                            )
                        );
    });

router.delete('/:user_food_id', passport.authenticate('jwt', { session: false }),
    (req, res) => {
    
    // passport.authenticate('jwt', { session: false })
    const _id = req.params.user_food_id;
    
    UserFood.findOneAndRemove({_id})
            .then(() =>res.json({success:true}));
    }
);


module.exports = router;
