const routes = require('./routes');

exports.handler = (event, context, callback) => {
    const request = event.Records[0].cf.request;
    const origin = request.origin;

    const identifiedRoute = routes.find((route) => {
        try {
            return route.uri === request.uri || route.uriPattern.test(request.uri);
        } catch(e) {
            return false;
        }
    });

    if (identifiedRoute) {
        origin.custom.domainName = identifiedRoute.origin.domain;
        origin.custom.path = identifiedRoute.origin.path;
        request.headers.host[0].value = identifiedRoute.origin.domain;

        if (identifiedRoute.origin.https) {
            origin.custom.port = 443;
            origin.custom.protocol = 'https';
        } else {
            origin.custom.port = 80;
            origin.custom.protocol = 'http';
        }

        callback(null, request);
    }

    callback(null, { status: 404 });
};
