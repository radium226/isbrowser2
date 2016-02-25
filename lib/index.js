var through = require('through2');
var recast = require('recast');
var transformer = require('./transformer.js');

module.exports = function (browser) {
    return function() {
        var buffers = [];

        return through(
            function (chunk, enc, done) {
                buffers.push(chunk);
                done();
            },
            function(done) {
                var source = Buffer.concat(buffers).toString().replace(/process\.browser/g, 'true');
                this.push(recast.print(transformer(recast.parse(source))).code);
                done();
            }
        );
    };
};
