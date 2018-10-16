import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(Vuex);
Vue.use(VueResource);

const store = new Vuex.Store({
	state: {
		dateInsured: '',
		dateEff: '',
		dateExp: '',
		firstDateStrArr_2: [],
		showmsg: false,
		ShowSearchResult: false,
		isShow: false,
		birthday: '',
		isSelectArea: false,
		isSelectOcc: false,
		isSelectGlobalArea: false,
		formData: {},
		TransactionId: '',
		msg: '',
		wx_id: '',
		startDate: ''
	},
	mutations: {
		setDateInsured: (state, data) => {
			state.dateInsured = data;
		},
		setDateEff: (state, data) => {
			state.dateEff = data;
		},
		setDateExp: (state, data) => {
			state.dateExp = data;
		},
		setfirstDateStrArr: (state, data) => {
			state.firstDateStrArr_2 = data;
		},
		setShowMsg: (state, data) => {
			state.showmsg = data;
		},
		setShowSearchResult: (state, data) => {
			state.ShowSearchResult = data;
		},
		setIsShow: (state, data) => {
			state.isShow = data;
		},
		setBirthday: (state, data) => {
			state.birthday = data;
		},
		setFormData: (state, data) => {
			state.formData = data;
		},
		setTransactionId: (state, data) => {
			state.TransactionId = data;
		},
		setError: (state, data) => {
			state.msg = data;
		},
		setWxId: (state, data) => {
			state.wx_id = data;
		},
		setStartDate: (state, data) => {
			console.log(data)
			state.startDate = data;
		}
	},
	actions: {
		getDateInsured: ({commit}, data) => {
			commit('setDateInsured', data);
		},
		getDateEff: ({commit}, data) => {
			commit('setDateEff', data);
		},
		getDateExp: ({commit}, data) => {
			commit('setDateExp', data);
		},
		getfirstDateStrArr: ({commit}, data) => {
			commit('setfirstDateStrArr', data);
		},
		getShowMsg: ({commit}, data) => {
			commit('setShowMsg', data);
		},
		getShowSearchResult: ({commit}, data) => {
			commit('setShowSearchResult', data);
		},
		getIsShow: ({commit}, data) => {
			commit('setIsShow', data);
		},
		getBirthday: ({commit}, data) => {
			commit('setBirthday', data);
		},
		getFormData: ({commit}, data) => {
			commit('setFormData', data);
		},
		getTransactionId: ({commit}, data) => {
			commit('setTransactionId', data);
		},
		getError: ({commit}, data) => {
			commit('setError', data);
		},
		getWxId: ({commit}, data) => {
			commit('setWxId', data);
		},
		getStartDate: ({commit}, data) => {
			console.log('get')
			commit('setStartDate', data);
		}
	},
	getter: {}
});

export default store;