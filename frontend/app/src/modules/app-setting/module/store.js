import './client'
import AppMixin from './mixin'
import Vue from 'vue'
Vue.mixin(AppMixin);

export default {
	namespaced: true,
	state: {
		isLoading: false
	},
	getters: {

	},
	mutations: {},
	mutations: {
		loading(state, isLoading) {
			state.isLoading = isLoading;
		}
	},
	actions: {
		initialize({ dispatch }) {
			console.info('Site initializing...')
			console.info('Site initialized.')
		}
	}
}