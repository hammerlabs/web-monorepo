module.exports = {
    rewrite: [
        {
            from: '/api/*',
            to: 'http://remote-api.org:8080/api/$1'
        }
    ],
    directory: 'dist',
    logFormat: 'stats'
}