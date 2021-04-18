const
    http = require('http'),
    express = require('express'),
    app = express(),
    server = http.createServer(app),
    odrl = require('../src'),
    port = 8080;

app.get('/', async function (request, response, next) {
    try {
        const requestPolicy = new odrl.RequestPolicy(request);
        const odrl_use = new odrl.Action({ uid: 'odrl:use' }, (ctx) => {
            debugger;
        });
        const policy = new odrl.Policy({
            uid: 'ex:testPolicy',
            conflict: odrl.perm,
            permission: [
                new odrl.Permission({
                    action: odrl_use,
                    target: requestPolicy.target
                })
            ]
        });
        requestPolicy.inheritFrom.add(policy);

        debugger;

        // TODO attach matching policies/rules
        const result = await policy.evaluate(response, next);
        debugger;
    } catch (err) {
        next(err);
    }
});

server.listen(port, () => {
    console.log('listening on port ' + port);
    http.request({ port, host: 'localhost', }).end();
});