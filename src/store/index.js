import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        repurchaseIndex:'',
        count: 0,
        selected: 'profile',
        buyCommitData:[],
        searchData: [],
        tableData: [],
        cardNumber: [{
              value: '6222600140004825644',
              label: '6222600140004825644'
            }, {
              value: '6111600110044405582',
              label: '6111600110044405582'
        }],
        selectedCard: '6222600140004825644'
    },
    mutations: {
        setData (state, payload) {
            state.tableData = payload
        },
        searchData (state, payload){
            state.searchData = payload
        },
        repurchaseIndex (state, payload) {
            state.repurchaseIndex = payload
        },
        selectedCard (state, payload) {
            state.selectedCard = payload
        },
        buyData (state, payload) {
            state.buyCommitData = payload
        }
    }
})

