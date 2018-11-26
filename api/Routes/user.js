const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const User = require('../Models/user.model');
const errorsHelper = require('../Helpers/errors');
const messagesHelper = require('../Helpers/messages');
const checkAuth = require('../Middleware/check-auth');

router.post('/signup', async (req, res, next) => {
    User.find({email: req.body.email})
        .then(user => {
            if (user.length >= 1) {
                return messagesHelper.stringResponseMessage(res, 409, 'Mail exist');
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return errorsHelper.errorWithMessage(res, err, 'Password Hashing fail')
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        user
                            .save()
                            .then(result => {
                                res.status(201).json({
                                    message: 'User created'
                                })
                            })
                            .catch(err => {
                                errorsHelper.catchError(res, err)
                            })
                    }
                });
            }
        });
});

router.delete('/:userId',checkAuth, (req, res, next) => {
    User.remove({_id: req.params.id})
        .then(result => {
            return messagesHelper.stringResponseMessage(res, 200, 'User deleted');
        })
        .catch(err => {
            return errorsHelper.errorWithMessage(res, err, 'User not deleted')
        })
});

router.post('/login', (req, res, next) => {
    User.find({email: req.body.email})
        .then(result => {
            if (result.length < 1) {
                return messagesHelper.stringResponseMessage(res, 401, 'Auth failed');
            }
            bcrypt.compare(req.body.password, result[0].password, (err, compareRes) => {
                if (compareRes) {
                    const token = JWT.sign({
                            email: result[0].email,
                            userId: result[0]._id
                        },
                        process.env.JWT_SECRET_KEY,
                        {
                           expiresIn: '1h'
                        });
                    return res.status(200).json({
                        Message: 'Auth Successful',
                        token: token
                    })
                } else {
                    return messagesHelper.stringResponseMessage(res, 401, 'Auth failed');
                }
            })
        })
        .catch(err => {

        })
});

module.exports = router;