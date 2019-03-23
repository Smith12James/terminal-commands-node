const fs = require('fs');

module.exports.ls = () => {
    fs.readdir('./', (err, files) => {
        const filesToString = files.reduce((acc, file) => {
            return `${acc} ${file} `;
        }, '');

        console.log(filesToString);
    });
};

module.exports.touch = (filename, err) => {
    if (err) {
        throw err;
    } else {
        fs.openSync(filename, 'w');
        `open filename`
    }
};

module.exports.mkdir = (dirPath) => {
    fs.mkdir(`${pathDir}`, {recursive: true }, (err) => {
        if (err) {
            throw err;
        }
    });
}