export default ({ app, req, store, redirect }, {}) => {
    app.$axios.defaults.baseURL = app.$env['API_URL'] || process.env.API_URL || 'http://localhost:3000'
    app.$axios.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
}
