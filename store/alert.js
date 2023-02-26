export const state = () => ({
    showAlert: false,
    message: null,
    type: null,
    id: null,
    showCloseText: null
})

export const mutations = {
    setAlert(state, config) {
        state.showAlert = !!config.show
        state.message = config.message
        state.type = config.type
        state.id = config.id
        state.showCloseText = config.showCloseText
    }
}

export const actions = {
    clearAlertTimeout({ state }) {
        clearTimeout(state.id)
    }
}
