const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const JWT = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY

const signToken = userID => {
    return JWT.sign({
        iss: secretKey,
        sub: userID
    }, secretKey, { expiresIn: "1h" })
}

// User register 
router.post('/create', (req, res) => {
    const { username, password } = req.body
    User.findOne({ username }, (err, user) => {
        if (err) {
            res.status(500).json({ message: "Error has occured!" })
        } else if (user) {
            res.status(500).json({ message: "Username is already taken!" })
        } else {
            const newUser = new User({ username, password });
            newUser.save(err => {
                if (err) {
                    res.status(500).json({ message: "Username is already taken!" })
                } else {
                    res.status(201).json({ message: "Account successfully create" })
                }
            })
        }
    })
})

router.get('/authenticated', passport.authenticate('jwt', { session: false }), (req, res) => {
    let info = req.user;
    info.password = null;
    res.status(200).json({ isAuthenticated: true, user: { ...info } });
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            next(err);
        }
        if (!user) {
            res.status(400).json({ message: 'Invalid user or password' })
        }
        else req.logIn(user, { session: false }, err => {
            if (err) {
                next(err);
            }
            const { _id, username, name, role } = req.user;
            const token = signToken(_id);
            res.cookie('access_token', token, { httpOnly: true });
            res.status(200).json({ isAuthenticated: true, user: { _id, token, username, name, role } });
        })
    })(req, res, next)
});

router.get('/logout', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.clearCookie('access_token');
    res.json({ user: { username: "" }, success: true });
})

module.exports = router;