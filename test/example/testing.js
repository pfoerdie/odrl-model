const
    http = require('http'),
    express = require('express'),
    fetch = require('node-fetch'),
    app = express(),
    server = http.createServer(app),
    odrl = require('../../src'),
    { policy_1, assets } = require('./setup'),
    port = 8080,
    url = '/test';

app.get(url, async function (request, response, next) {
    try {
        const reqPolicy = new odrl.RequestPolicy(request);
        reqPolicy.target.partOf.add(assets);
        reqPolicy.inheritFrom.add(policy_1);
        const result = await reqPolicy.evaluate(response, next);
        debugger;
        next();
    } catch (err) {
        console.error(err?.stack ?? err);
        next(err);
    }
});

server.listen(port, async () => {
    const response = await fetch('http://localhost:' + port + url);
    process.exit(response.ok ? 0 : 1);
});