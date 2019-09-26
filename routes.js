const origins = {
    home: {
        static: {
            domain: 'nextjs-home-zone.s3-website-us-east-1.amazonaws.com',
            https: false,
            path: '/pages',
        },
        ssr: {
            domain: '4kw98wxu20.execute-api.us-east-1.amazonaws.com',
            https: true,
            path: '/nextjs-home-zone',
        },
    },
    show: {
        ssr: {
            domain: '6yfwj6q92i.execute-api.us-east-1.amazonaws.com',
            https: true,
            path: '/nextjs-show-zone',
        },
    },
};

module.exports = [
    {
        uri: '/',
        origin: origins.home.ssr,
    },
    {
        uri: '/about',
        origin: origins.home.static,
    },
    {
        uriPattern: /\/shows\/[0-9]+/,
        origin: origins.show.ssr,
    },
];
