//引入封装好的接口
import { getGoodsList, getGoodsCount } from "../../../util/axios";
const state = {
  goodslist: [],
  size: 20,
  page: 1,
  total: 0,
};
const getters = {
  //列表
  getGoodsList(state) {
    return state.goodslist;
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
  REQ_GOODSLIST(state, payload) {
    state.goodslist = payload;
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
  getGoodsAction(context) {
    console.log(context, "上下文对象");
    //   //页面一加载调用角色列表
    getGoodsList({
      size: context.state.size, //每一页显示的条目
      page: context.state.page,
    }).then((res) => {
      if (res.code === 200) {
        let list = res.list ? res.list : []
        //情景判断，如果当前page>1并且数组的长度为0page--
        if(context.state.page>1&&list.length==0){
          context.state.page--
          context.dispatch('getGoodsAction')
          return
        }
        context.commit("REQ_GOODSLIST", list);
      }
    });
  },
  //封装一个获取总条数行动
  getCountAction(context) {
    getGoodsCount().then((res) => {
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
    context.commit("CHANGE_PAGE", payload);
    context.dispatch("getGoodsAction");
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
