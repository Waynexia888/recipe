const express = require("express");
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require("bcryptjs");
const keys = require("../../confg/keys");
const jwt = require("jsonwebtoken");

router.get("/test", (req, res) => {
    res.json({ msg: "This is the user route"});
});


router.post('/register', (req, res) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if (user) {
            return res.status(400).json({email: "A user is already registered with that email"})
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then((user) => res.json(user))
                        .catch(err => console.log(err))
                })
            })
            
        }
    })
})

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
        .then(user => {
            if(!user) {
                return res.status(404).json({ email: "This user does not exist." });
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                        const payload = {
                            id: user.id,
                            name: user.name,
                            email: user.email
                        }
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            { expiresIn: 3600 },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: "Bearer " + token
                                });
                            }
                        )
                    } else {
                        return res.status(400).json({ password: "Incorrect password" });
                    }
                })
        })
})

module.exports = router;