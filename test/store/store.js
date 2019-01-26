
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
	vuexAttr: true,
	storeAttr: 0,
	personalInfo:[]
}

const getters = {	//监听state值的变化
	isVuex(state){
		return state.vuexAttr;
	},
	isStore(state){
		return state.storeAttr;
	},
	personalInfo(state){
		return state.personalInfo;
	}
}

const mutations = {	//定义改变state的初始值的方法
	show(state){
		state.vuexAttr = true;
	},
	hide(state){
		state.vuexAttr = false;
	},
	newNum(state,newVal){
		state.storeAttr += newVal;
	},
	setPersonalInfo(state,newVal){
		state.personalInfo = newVal
	}
}

const actions = {	//定义异步触发mutations里函数的方法，context与store 实例具有相同方法和属性
	showVuex(context){
		context.commit('show');
	},
	hideVuex(context){
		context.commit('hide');
	},
	getNewNum(context,num){
		context.commit('newNum',num);
	},
	callPersonalInfo(context,newVal){
		context.commit('setPersonalInfo',newVal);
	}
}

const store = new Vuex.Store({
	state,
	getters,
	mutations,
	actions
});

export default store;
