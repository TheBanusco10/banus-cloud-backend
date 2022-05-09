const { randomUUID } = require('crypto');
const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/file', async (req, res) => {

    fs.readdir('./public', (err, files) => {
        console.log(files);

        if (err) return res.status(500).send({
            message: 'Something was wrong'
        });

        res.send({
            message: 'Success',
            files
        });
    });

});

router.post('/file', async (req, res) => {
    const files = req.files.files;

    try {

        if (files.length) {
            files.forEach(el => {
                el.mv(`./public/${el.name}`);
            });
        }else {
            files.mv(`./public/${files.name}`);
        }
    
        res.send({
            message: 'Files copied successfully'
        });

    }catch (err) {
        res.send(err);
    }
});

router.delete('/file/:name', async (req, res) => {
    const filename = req.params.name;

    fs.rm(`./public/${filename}`, function (err) {
        if (err) return res.status(500).send({message: err});
        res.send({
            message: 'File removed'
        });
    });
});

module.exports = router;