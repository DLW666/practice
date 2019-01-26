
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
	hotSearch:[], //热搜
	indexBanners:[], //首页banner
	partners:[], //合作
	recommends:[], //推荐
}

const getters = {	//监听state值的变化
	getHotSearch:state => {
		return state.hotSearch;
	},
	getIndexBanners:state => {
		return state.indexBanners
	},
	getPartners:state => {
		return state.partners
	},
	getRecommends:state => {
		return state.recommends
	}
}

const mutations = {	//定义改变state的方法
	setHotSearch(state,newVal){
		state.hotSearch = newVal
	},
	setIndexBanners(state,newVal){
		state.indexBanners = newVal
	},
	setPartners(state,newVal){
		state.partners = newVal
	},
	setRecommends(state,newVal){
		state.recommends = newVal
	}
}

const actions = {	//定义异步触发mutations里函数的方法，context与store 实例具有相同方法和属性
	callHotSearch(context,newVal){
		context.commit('setHotSearch',newVal);
	},
	callIndexBanners(context,newVal){
		context.commit('setIndexBanners',newVal)
	},
	callPartners(context,newVal){
		context.commit('setPartners',newVal)
	},
	callRecommends(context,newVal){
		context.commit('setRecommends',newVal)
	}
}

const store = new Vuex.Store({
	state,
	getters,
	mutations,
	actions
});

export default store;
