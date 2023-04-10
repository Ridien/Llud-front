export default ({ app, req, store, redirect }, {}) => {
    app.$axios.defaults.baseURL = app.$env['API_URL'] || process.env.API_URL || 'https://cloudy-galoshes-fish.cyclic.app/'
    app.$axios.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
}
