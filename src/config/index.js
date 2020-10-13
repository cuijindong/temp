module.exports = {
    baseUrl: 'http://192.168.111.91:8080/',
    apiflag: process.env.NODE_ENV === 'production' ? '' : '/api'
}