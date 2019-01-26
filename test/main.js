// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router/router.js'
import store from './store/store.js'
import VueResource from './resource/resource.js'
import App from './App'
import './main.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
var app = new Vue({
	el: '#app',
	router,
	store,
	VueResource,
	components: { App },
	template: '<App/>'
})
