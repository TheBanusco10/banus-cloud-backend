const PUBLIC_DIR = './public';

const helper = require('../helpers');

const express = require('express');
const fs = require('fs');
const router = express.Router();

const mime = require('mime-types');

router.get('/file', async (req, res) => {

    fs.readdir(PUBLIC_DIR, (err, files) => {

        // Not showing .gitkeep file
        files = files.filter(el => el !== '.gitkeep');

        let finalFiles = [];

        files.forEach(file => {
            finalFiles.push(helper.getFileInformation(`${PUBLIC_DIR}/${file}`, file));
        });

        if (err) return res.status(500).send({
            message: 'Something was wrong'
        });

        res.send({
            message: 'Success',
            files: finalFiles
        });
    });

});

router.post('/file', async (req, res) => {
    const files = req.files.files;

    try {

        // let fileInformation = [];

        if (files.length) {
            files.forEach(el => {
                // TODO Return file/files uploaded to avoid a new request to the server when a file is uploaded
                el.mv(`${PUBLIC_DIR}/${el.name}`);
                // const FILENAME = el.name
                // el.mv(`${PUBLIC_DIR}/${el.name}`, function (err) {
                    
                //     fileInformation.push(helper.getFileInformation(`${PUBLIC_DIR}/${FILENAME}`, FILENAME));
                //     console.log(helper.getFileInformation(`${PUBLIC_DIR}/${FILENAME}`, FILENAME));
                // });
            });

        }else {
            files.mv(`${PUBLIC_DIR}/${files.name}`);
            // fileInformation.push(helper.getFileInformation(`${PUBLIC_DIR}/${files.name}`, files.name));
        }

        res.status(200).send({
            message: 'Files copied successfully',
            // files: fileInformation
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