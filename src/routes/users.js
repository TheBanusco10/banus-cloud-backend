const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const saltRounds = 10;

const UserModel = require('../mongo/models/users');

router.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {

        const user = await UserModel.findOne({email: email});

        if (!user)
            return res.status(500).send({
                message: 'User not found'
            });

        const match = await bcrypt.compare(password, user.password);

        if (!match)
            return res.status(500).send({
                message: 'Bad credentials'
            });

        res.status(200).send({
            user
        });

    
    }catch(err) {
        console.log(err);
    }
    

});

router.post('/register', async (req, res) => {
    
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    try {

        bcrypt.hash(password, saltRounds, async function (err, hash) {
            if (err)
                return res.status(500).send({
                    message: 'Some error has ocurred hashing password'
                });

            const doc = await UserModel.create({
                name,
                email,
                password: hash
            });

            res.status(200).send(doc);
        });
    
    }catch(err) {
        console.log(err);
    }
    

});

module.exports = router;