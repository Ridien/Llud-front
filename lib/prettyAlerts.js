export default class PrettyAlerts {
    constructor(store) {
        this.store = store
    }

    show(config) {
        if (config.message !== 'erro_de_requisicao' && config.message) {
            this.store.dispatch('alert/clearAlertTimeout')

            if (!config.dontDismiss) {
                config.id = setTimeout(() => {
                    this.store.commit('alert/setAlert', { show: false })
                }, config.dismissTimeout || 10000)
            }

            config.show = true
            this.store.commit('alert/setAlert', config)
        }
    }

    error(message) {
        if (message !== 'erro_de_requisicao' && message) {
            this.show({
                type: 'error',
                message: message
            })
        }
    }

    info(message) {
        this.show({
            type: 'info',
            message: message
        })
    }

    warn(message) {
        this.show({
            type: 'warn',
            message: message
        })
    }
    
}