const PUBLIC_DIR = './public';

const helper = require('../helpers');

const express = require('express');
const fs = require('fs');
const { randomUUID } = require('crypto');
const router = express.Router();

const FilesModel = require('../mongo/models/files');

router.post('/get-files', async (req, res) => {

    const user_id = req.body.user_id;

    const userFiles = await FilesModel.find({user: user_id});

    console.log(userFiles);

    let finalFiles = [];

    try {

        userFiles.forEach(file => {
            finalFiles.push(helper.getFileInformation(`${PUBLIC_DIR}/${file.name}`, file.name));
        });

        res.send({
            message: 'Success',
            files: finalFiles
        });

    }catch(err) {
        if (err) return res.status(500).send({
            message: 'Something was wrong'
        });
    }

});

router.post('/file', async (req, res) => {
    const files = req.files.files;

    const user_id = req.body.user_id;

    console.log(user_id);

    try {

        if (files.length) {
            files.forEach(async el => {

                const uuid = randomUUID();
                const filename = `${uuid}-${el.name}`;

                // TODO Return file/files uploaded to avoid a new request to the server when a file is uploaded
                el.mv(`${PUBLIC_DIR}/${filename}`);
                await FilesModel.create({
                    user: user_id,
                    name: filename
                });
                
            });

        }else {

            const uuid = randomUUID();

            const filename = `${uuid}-${files.name}`;

            files.mv(`${PUBLIC_DIR}/${filename}`);
            
            await FilesModel.create({
                user: user_id,
                name: filename
            });
        }
        

        res.status(200).send({
            message: 'Files copied successfully'
        });

    }catch (err) {
        res.status(500).send(err);
    }
});

router.delete('/file/:name', async (req, res) => {
    const filename = req.params.name;

    fs.rm(`${PUBLIC_DIR}/${filename}`, function (err) {
        if (err) return res.status(500).send({message: err});
        res.send({
            message: 'File removed'
        });
    });
});

module.exports = router;