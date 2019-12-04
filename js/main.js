import App from './App.js'

const v = new Vue({
    render: h => h(App)
}).$mount('#app')
Vue.config.performance = true;