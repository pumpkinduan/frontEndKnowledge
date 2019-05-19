const fs = require('fs');
const files = fs.readdirSync('./web');
let map = new Map();
let len = files.length;
for (var i = 0; i < len; i ++) {
    var temp = require('./web/' + files[i]);
    for (var [key, value] of temp) {
        if ( !map.get(key) ) {
            map.set(key, value);
        } else {
            throw new Error('repeated url' + key);
        }
    }
}
module.exports = map;