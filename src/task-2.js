const csv = require('csvtojson');
const path = require('path');
const fs = require('fs');

const readStream = fs.createReadStream(path.join(__dirname, './csv/nodejs-hw1-ex1.csv'));
const writeStream = fs.createWriteStream(path.join(__dirname, './csv/nodejs-hw1-ex2.txt'));

readStream
  .on('error', (err) => console.log(err))
  .pipe(
    csv({
      headers: ['book', 'author', 'amount', 'price'],
      checkType: true,
    }),
  )
  .on('error', (err) => console.log(err))
  .pipe(writeStream)
  .on('error', (err) => console.log(err));
