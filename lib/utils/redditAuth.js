var snoowrap = require('snoowrap');
var https = require('https');
var randomstring = require("randomstring");
var url = require('url');
var open = require("open");

module.exports = function (options) {
    return new Promise((resolve, reject) => {

        var server = https.createServer((request, responce) => {
            var req = url.parse(request.url, true);
            if (req.query.state == options.state) {
                responce.write("<!DOCTYPE html><html><body><script>window.close();</script> </body></html>");
                responce.end();
                resolve(request.query.code);
            }
        });
        server.listen(65010);

        var u = snoowrap.getAuthUrl(options);
        open(u);
    });
};
