export default ({ app, req, store, redirect }, {}) => {
    app.$axios.defaults.baseURL = app.$env['API_URL']
    app.$axios.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
}
