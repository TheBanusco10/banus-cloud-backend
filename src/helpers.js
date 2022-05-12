const fs = require('fs');
const mime = require('mime-types');

const UUID_LENGTH = 36;

/**
 * @description Get information of a file: Name, SizeInBytes and Type
 * @param {string} path PUBLIC_PATH with filename
 * @param {string} filename Filename
 * @returns File copied
 */
function getFileInformation(path, filename) {
    const size = fs.statSync(path).size;
    const mimeType = mime.lookup(path);
    const type = mimeType.substring(0, mimeType.indexOf('/'));

    return {
        name: filename,
        sizeInBytes: size,
        type
    }
}

module.exports = { getFileInformation };