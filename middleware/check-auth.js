import VueCookies from 'vue-cookies'

export default function ({
    req,
    res,
    store,
    redirect,
    route,
    app
}) {
    let token = null
    let role = null
    let routeWhiteList = ['index', 'register']
    if (req) {
        let cookies = []

        if (req.headers.cookie) {
            cookies = req.headers.cookie.split(';')
        }

        const cookieLine = cookies.find(c => c.trim().startsWith('authToken'))
        if (cookieLine) token = cookieLine.split('=')[1]

    } else {
        token = VueCookies.get('authToken')
    }
    let tokenParam = route.query.token ? decodeURIComponent(route.query.token) : null
    if (tokenParam) {
        store.dispatch('saveAuthToken', tokenParam)
        store.commit('setToken', tokenParam)
        if (process.server) {
            res.setHeader('Set-Cookie', [`authToken=${tokenParam}`]);
        } else {
            VueCookies.set('authToken', tokenParam)
        }
        token = tokenParam
    }
    if(!token){
        if(!routeWhiteList.includes(route.name)){
            redirect('/')
        }
    }
    store.dispatch('initAuth', req)
}
