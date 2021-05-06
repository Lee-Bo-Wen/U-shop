//引入封装好的接口
import { getSpecsList, getSpecsCount } from "../../../util/axios";
const state = {
  specslist: [],
  size: 2,
  page: 1,
  total: 0,
};
const getters = {
  //列表
  getSpecsList(state) {
    return state.specslist;
  },
  //总条数
  getCount(state) {
    return state.total;
  },
  //size
  getSize(state) {
    return state.size;
  },
};
const mutations = {
  //修改列表
  REQ_SPECSLIST(state, payload) {
    state.specslist = payload;
  },
  //修改总数
  REQ_COUNT(state, payload) {
    state.total = payload;
  },
  //修改page
  CHANGE_PAGE(state, payload) {
    state.page = payload;
  },
};
const actions = {
  //封装一个触发分类列表的行动
  getSpecsListAction(context) {
    console.log(context, "上下文对象");
    //   //页面一加载调用角色列表
    getSpecsList({
      size: context.state.size, //每一页显示的条目
      page: context.state.page,
    }).then((res) => {
      if (res.code === 200) {
        //情景判断，如果当前page>1并且数组的长度为0page--
        if(context.state.page>1&&res.list.length==0){
          context.state.page--
          context.dispatch('getSpecsListAction')
          return
        }
        context.commit("REQ_SPECSLIST", res.list);
      }
    });
  },
  //封装一个获取总条数行动
  getCountAction(context) {
    getSpecsCount().then((res) => {
      if (res.code == 200) {
        //提交一个mutation
        context.commit("REQ_COUNT", res.list[0].total);
      }
    });
  },
  //切换页码的行动
  changePageAction(context, payload) {
    console.log("行动");
    //修改page 并重新调取列表
    //  context.state.page = payload
    //修改state 就要用mutation
    context.commit("CHANGE_PAGE", payload);
    context.dispatch("getSpecsListAction");
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
