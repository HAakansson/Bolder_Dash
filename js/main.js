import App from './App.js'

new Vue({
    render: h => h(App)
}).$mount('#app')

Vue.config.performance = true;