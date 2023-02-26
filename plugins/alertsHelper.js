import PrettyAlerts from '~/lib/PrettyAlerts'

export default ({ app }, inject) => {
    inject('prettyAlerts', new PrettyAlerts(app.store))
}
