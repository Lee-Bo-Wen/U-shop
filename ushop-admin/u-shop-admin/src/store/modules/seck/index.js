//引入封装好的接口
import {getSeckList} from '../../../util/axios'
const state = {
    seckList:[]
} 
const getters = {
    getSeckList(state){
        return state.seckList
    }
}
const mutations = {
    REQ_SECKLIST(state,payload){
        state.seckList = payload
    }
} 
const actions = {
    //封装一个获取菜单列表的行动
    getSeckListAction({commit}){
        getSeckList()
        .then(res=>{
            if(res.code==200){
                commit('REQ_SECKLIST',res.list)
            }
        })
    }
} 


export default {
    state,
    getters,
    mutations,
    actions,
    namespaced:true
}