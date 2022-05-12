const express = require('express');
const router = express.Router();

const UserModel = require('../mongo/models/users');

router.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {

        const doc = await UserModel.findOne({email: email});
        // TODO Check password
        if (doc)
            res.status(200).send(doc);
        else
            res.status(500).send({
                message: 'User not found'
            });

    
    }catch(err) {
        console.log(err);
    }
    

});

// TODO Change route name to register
router.post('/user', async (req, res) => {
    
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    try {

        // TODO Encrypt password
        const doc = await UserModel.create({
            name,
            email,
            password
        });

        res.status(200).send(doc);
    
    }catch(err) {
        console.log(err);
    }
    

});

module.exports = router;