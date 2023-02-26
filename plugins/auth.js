export default ({
    app,
    req,
    store
}) => {
    app.$axios.defaults.headers.common.Authorization = `Bearer ${
        store.state.token
    }`
}
