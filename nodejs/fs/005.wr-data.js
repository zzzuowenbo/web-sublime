const fs = require('fs');
const rs = fs.createReadStream('./rs.txt');
const ws = fs.createWriteStream('./rs-copy.txt');
rs.pipe(ws);