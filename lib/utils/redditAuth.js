var snoowrap = require('snoowrap');
var http = require('http');
var randomstring = require("randomstring");
var url = require('url');
var open = require("open");

module.exports = function(options, def) {
    return new Promise((resolve, reject) => {
        if (def !== undefined){
            resolve(def);
            return;
        }

        var server = http.createServer((request, responce) => {
            var req = url.parse(request.url, true);
            if (req.query.state == options.state) {
                responce.writeHead(200, {
                    'Content-Type': 'text/html'
                })
                responce.write('<!DOCTYPE html><html> <body> <h1>Thank you</h1> <script type="text/javascript">window.close(); </script> </body></html>');
                responce.end();
                server.close();

                snoowrap.fromAuthCode({code: req.query.code, userAgent: 'Reddit For Atom', clientId: options.clientId, redirectUri: 'http://localhost:65010/authorize_callback'}).then(resolve).catch(reject);
            }
        });
        server.listen(65010);

        var u = snoowrap.getAuthUrl(options);
        open(u);
    });
};
