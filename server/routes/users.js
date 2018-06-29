const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
    User
    .find()
    .then(user => {res.status(200).json(user);

        });
});

router.get('/:id', (req, res) => {
    User
    .findById(req.params.id)
    .then(user => {
        (!user ? res.status(404).send(): res.status(200).json(user));
        }).catch(err => res.status(404))
});

router.post('/', (req, res) => {
    const user = new User(req.body)
    user
    .save()
    .then(user => {
    res.status(201).json(user);
    });
});

router.put('/:id', (req, res) => {
    User
    .findByIdAndUpdate(req.params.id)
    .then(user => {
    (!user ? res.status(404).send(): res.status(204).json(user));
        }).catch(err => res.status(500).send());
});



router.delete('/:id', (req, res) => {
    User
    .findByIdAndRemove(req.params.id)
    .then(user => {
    (!user ? res.status(404).send(): res.status(200).json(user));
        }).catch(err => res.status(500).send());
});

module.exports = router;