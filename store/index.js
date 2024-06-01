import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import Http from '../common/js/http.js'

const store = new Vuex.Store({
	state: {
		siteState: 1,  //默认是普通用户 2是员工
		tabbarList: {},
	
		sourceMember: 0, // 来源会员
		userInfo: {}, // 授权信息
		token: null,
		shareConfiguration: {},  //分享配置
		flRefresh: 0,
	},
	mutations: {
		setSiteState(state, siteStateVal) {
			state.siteState = siteStateVal;
		},
		setTabbarList(state, value) {
			state.tabbarList = value;
		},
		setToken(state, value) {
			state.token = value;
		},
		setUserinfo(state, value) {
			state.userInfo = value;
		},
		setSourceMember(state, value) {
			state.sourceMember = value;
		},
		shareConfigurationse(state,value) {
			state.shareConfiguration = value
		},
		setflRefresh(state, flRefreshVal) {
			state.flRefresh = flRefreshVal;
		},
	},
	actions: {
    init() {
			if (uni.getStorageSync('bottomNav')) {
				this.commit('setTabbarList', uni.getStorageSync('bottomNav'))
			}
		},
	}
})
export default store
