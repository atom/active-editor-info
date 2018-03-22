var snoowrap = require('snoowrap');
var http = require('http');
var randomstring = require("randomstring");
var url = require('url');
var open = require("open");

module.exports = function(options) {
    return new Promise((resolve, reject) => {
        var server = http.createServer((request, responce) => {
            var req = url.parse(request.url, true);
            if (req.query.state == options.state) {
                responce.writeHead(302, {
                    'Location': 'https://github.com/danhab99/active-editor-info'
                })
                responce.write("<h1>Thank you</h1>");
                responce.end();
                //resolve(req.query.code);

                snoowrap.fromAuthCode({code: req.query.code, userAgent: 'Reddit For Atom', clientId: options.clientId, redirectUri: 'http://localhost:65010/authorize_callback'}).then(resolve).catch(reject);
            }
        });
        server.listen(65010);

        var u = snoowrap.getAuthUrl(options);
        open(u);
    });
};
