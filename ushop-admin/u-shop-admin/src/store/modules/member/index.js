//引入封装好的接口
import {getMemberList} from '../../../util/axios'
const state = {
    memberList:[]
} 
const getters = {
    getMemberList(state){
        return state.memberList
    }
}
const mutations = {
    REQ_MEMBERLIST(state,payload){
        state.memberList = payload
    }
} 
const actions = {
    //封装一个获取菜单列表的行动
    getMemberListAction({commit}){
        getMemberList()
        .then(res=>{
            if(res.code==200){
                commit('REQ_MEMBERLIST',res.list)
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