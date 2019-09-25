exports.handler = (event, context, callback) => {
    const request = event.Records[0].cf.request;
    const origin = request.origin;

    const homeZoneDomain = '4kw98wxu20.execute-api.us-east-1.amazonaws.com';
    const homeZonePath = '/nextjs-home-zone';
    const showZoneDomain = '6yfwj6q92i.execute-api.us-east-1.amazonaws.com';
    const showZonePath = '/nextjs-show-zone';

    if (
        request.uri === '/' ||
        request.uri === '/about'
    ) {
        origin.custom.domainName = homeZoneDomain;
        origin.custom.path = homeZonePath;
        request.headers.host[0].value = homeZoneDomain;
    } else if (
        /\/[0-9]{4}\/[0-9]{2}\/[0-9]+/.test(request.uri)
    ) {
        origin.custom.domainName = showZoneDomain;
        origin.custom.path = showZonePath;
        request.headers.host[0].value = showZoneDomain;
    }

    callback(null, request);
};