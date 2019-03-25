const fs = require("fs");

function done(output) {
    process.stdout.write(output);
    process.stdout.write('\nprompt > ');
}

function evaluateCmd(userInput) {
    const userInputArray = userInput.split(" ");
    const command = userInputArray[0];

    switch (command) {
        case "echo":
            commandLibrary.echo(userInputArray.slice(1).join(" "));
            break;

        case "cat":
            commandLibrary.cat(userInputArray.slice(1));
            break;

        case "head":
            commandLibrary.head(userInputArray.slice(1));
            break;

        case "tail": 
            commandLibrary.tail(userInputArray.slice(1));
            break;

        case "touch":
            commandLibrary.touch(userInputArray.slice(1));
            break;
    }
}

const commandLibrary = {
    "echo": function(userInput) {
        done(userInput);
    },

    "cat": function(fullPath) {
        const fileName = fullPath[0];

        fs.readFile(fileName, (err, data) => {
            if (err) throw err;
                done(data);
        });
    },
    
    "head": function(fullPath) {
        const fileName = fullPath[0];
        
        fs.readFile(fileName, (err, data) => {
            if (err) throw err;
            let text = data.toString('utf8');
            let slicedText = text.split('\n').slice(0,10).join('\n');
            let bufferText = Buffer.from(slicedText, 'utf8');
            done(bufferText);
        });
    },

    "tail": function(fullPath) {
        const fileName = fullPath[0];

        fs.readFile(fileName, (err, data) => {
            if (err) throw err;
            let text = data.toString('utf8');
            let slicedText = text.split('\n').slice(-10).join('\n');
            let bufferText = Buffer.from(slicedText, 'utf8');
            done(bufferText);
        });
    },

    "touch": function(fileName, data) {
        fs.writeFile(fileName, data, (err) => {
            if (err) throw err;
            console.log('File is created')
        })
    }
};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;