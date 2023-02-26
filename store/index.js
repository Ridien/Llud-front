import Cookie from 'vue-cookies'

export const state = () => ({
    token: null
})

export const actions = {
    async authenticateUser(context, { token }) {
        if (!token) return
        context.dispatch('saveAuthToken', token)
        this.commit('setToken', token)
    },
    initAuth(vuexContext, req) {
        let token = null
        if (req) {
            if (!req.headers.cookie) {
                return
            }

            const tokenLine = req.headers.cookie.split(';').find(c => c.trim().startsWith('authToken'))
            if (tokenLine) {
                token = tokenLine.split('=')[1]
            }
        } else {
            token = Cookie.get('authToken')
        }
        if (token) {
            vuexContext.commit('setToken', token)
        }
    },
    logout(vuexContext) {
        vuexContext.commit('setToken', null)
        Cookie.remove('authToken')
    },
    saveAuthToken({ }, token) {
        if (token) {
            if (process.client) Cookie.set('authToken', token)
            this.$axios.setToken(token, 'Bearer')
        } else {
            if (process.client) Cookie.remove('authToken')
            this.$axios.setToken(null, 'Bearer')
        }
    }
}

export const mutations = {
    setToken(state, token) {
        state.token = token
        if (process.env.NODE_ENV !== 'test') this.$axios.setToken(token, 'Bearer')
    }
}

export const getters = {
    isAuthenticated(state) {
        return state.token != null
    }
}
