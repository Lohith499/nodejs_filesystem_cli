const inquirer = require('./inquirer');
const prompt = require('prompt');
const fs = require('fs');
const readline = require('readline');
const { once } = require('events');
const chalk = require('chalk');


async function print(path) {
    try {
        const dir = await readdirAsync(path); //await fs.opendir(path);
        for await (const dirent of dir) {
            console.log(chalk.cyan(dirent));
        }
    } catch (err) {
        console.error(chalk.red(err.message));
    }
}
function readdirAsync(path) {
    return new Promise(function (resolve, reject) {
        fs.readdir(path, function (error, result) {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

async function processDeleteFile(filepath, cb) {
    fs.access(filepath, fs.constants.F_OK, (err) => {
        if (err) {
            console.log(chalk.red(err.message));
            return cb();
        } else {
            fs.unlink(filepath, (err) => {
                if (err) {
                    console.log(chalk.red(`${filepath} was not deleted`));
                    console.log(chalk.red(err.message));
                    return cb();
                }
                else {
                    console.log(chalk.green(`${filepath} was deleted`));
                    return cb();
                }

            });
        }
    });
}


async function processReadLineByLine(filepath, cb) {
    //check if we have access to file
    fs.access(filepath, fs.constants.F_OK, (err) => {
        if (err) {
            console.log(chalk.red(err.message));
            return cb();
        } else {
            // Check if the file is readable.
            fs.access(filepath, fs.constants.R_OK, (err) => {
                if (err) {
                    console.log(chalk.red(err.message));
                    return cb();
                } else {
                    //reading the file and displaying the data
                    try {
                        const data = fs.readFileSync(filepath, 'utf8')
                        console.log(chalk.green(data))
                        return cb();
                    } catch (err) {
                        console.error(chalk.red(err.message))
                        return cb();
                    }
                }
            });
        }
    });
}

async function processAppendLineByLine(filepath, cb) {
    // Check if the file exists in the current directory, and if it is writable.
    fs.access(filepath, fs.constants.F_OK | fs.constants.W_OK, async (err) => {
        if (err) {
            console.log(chalk.red(err.message));
            return cb();
        } else {
            console.log(chalk.green("File Exist to write"));

            let logger = fs.createWriteStream(filepath, {
                flags: 'a', // 'a' means appending (old data will be preserved)
                encoding: "utf8",
                mode: parseInt('0644', 8)
            })
            let writeEnd = false;
            while (!writeEnd) {
                writeEnd = await writeLine();
                if (writeEnd) {
                    return cb();
                }
            }
            function writeLine() {
                return new Promise((resolve, reject) => {
                    prompt.start();
                    prompt.get(['line:'], function (err, result) {
                        if (err) { return onErr(err); }
                        if (result["line:"] !== "^exit") {
                            console.log(typeof (result["line:"]));
                            var text = result["line:"] + '\r\n';
                            logger.write(text);
                            /*  fs.appendFile(filepath, text, function (err) {
                                    if (err) {
                                        console.log(err);
                                        restart();
                                    }
                                    resolve(false);
                                });*/
                            resolve(false);
                        } else {
                            //  logger.end();
                            resolve(true);
                        }
                    });
                });

            }
        }
    });
}
async function processWriteLineByLine(filepath, cb) {
    fs.readdir(filepath.path, async function (error, result) {
        if (error) {
            console.log(chalk.red(error.message));
            return cb();
        } else {
            let logger = fs.createWriteStream(filepath.path + "\\" + filepath.filename, {
                flags: 'a', // 'a' means appending (old data will be preserved)
                encoding: "utf8",
                mode: parseInt('0644', 8)
            })
            let writeEnd = false;
            while (!writeEnd) {
                writeEnd = await writeLine();
                if (writeEnd) {
                    return cb();
                }
            }
            function writeLine() {
                return new Promise((resolve, reject) => {
                    prompt.start();
                    prompt.get(['line:'], function (err, result) {
                        if (err) { return onErr(err); }
                        if (result["line:"] !== "^exit") {
                            console.log(typeof (result["line:"]));
                            var text = result["line:"] + '\r\n';
                            logger.write(text);
                            /*  fs.appendFile(filepath, text, function (err) {
                                    if (err) {
                                        console.log(err);
                                        restart();
                                    }
                                    resolve(false);
                                });*/
                            resolve(false);
                        } else {
                            //  logger.end();
                            resolve(true);
                        }
                    });
                });

            }
        }
    });

}


module.exports = { print,readdirAsync,processDeleteFile,processReadLineByLine,processAppendLineByLine, processWriteLineByLine }