// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router/router.js'
import store from './store/store.js'
import VueCarousel from 'vue-carousel'
import axios from 'axios'
import {get} from './axios/axios.js'
import App from './App.vue'
import './main.css'

Vue.config.productionTip = false;

Vue.use(VueCarousel);

//定义全局变量
Vue.prototype.$get = get;

//截取字节数
var filter_byte = Vue.filter('filter_recommend_tit',(val,len) => {  //len字节数
	for (let i = Math.floor(len / 2); i < val.length; i++){
		if (val.substr(0, i).replace(/[^\x00-\xff]/g, '01').length >= len){ //将一个文字换成两个数字
			return val.substr(0, Math.floor(i / 2) * 2) + '...';
		}
	}
	return val;
});

/* eslint-disable no-new */
var app = new Vue({
	el: '#app',
	router,
	store,
	components: { App },
	template: '<App/>',
	mounted(){
		if(window.localStorage.getItem('login') == null){ //初始化登录状态
			window.localStorage.setItem('login','false');
		}
		if(window.localStorage.getItem('cart') == null){ //初始化购物车
			window.localStorage.setItem('cart','[]');
		}
	}
});
