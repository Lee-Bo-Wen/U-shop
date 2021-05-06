//引入封装好的接口
import { getCateList } from "../../../util/axios";
const state = {
  catelist: [],
};
const getters = {
  getCateList(state) {
    return state.catelist;
  },
};
const mutations = {
    REQ_CATELIST(state,payload){
        state.catelist = payload
    }
};
const actions = {
  //封装一个触发分类列表的行动
  getCateListAction({commit}) {
    //   //页面一加载调用角色列表
    getCateList().then((res) => {
      if (res.code === 200) {
          commit('REQ_CATELIST',res.list)
      }
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
