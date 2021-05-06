<template>
  <div>
    <el-dialog
      :title="diaInfo.isAdd ? '添加秒杀' : '编辑秒杀'"
      :visible.sync="diaInfo.isShow"
      :before-close="cancel"
      center
    >
      <el-form :model="seckInfo" :rules="rules" ref="seckInfo">
        <el-form-item
          label="活动名称"
          :label-width="formLabelWidth"
          prop="title"
        >
          <el-input v-model="seckInfo.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="timer"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="一级分类"
          :label-width="formLabelWidth"
          prop="first_cateid"
        >
          <el-select
            @change="changeCate(false)"
            v-model="seckInfo.first_cateid"
            placeholder="请选择"
          >
            <el-option
              v-for="item in catelist"
              :key="item.id"
              :value="item.id"
              :label="item.catename"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="二级分类"
          :label-width="formLabelWidth"
          prop="second_cateid"
        >
          <el-select
            @change="changeGoods(false)"
            v-model="seckInfo.second_cateid"
            placeholder="请选择"
          >
            <el-option
              v-for="item in secondArr"
              :key="item.id"
              :value="item.id"
              :label="item.catename"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" :label-width="formLabelWidth">
          <el-select v-model="seckInfo.goodsid" placeholder="请选择">
            <el-option
              v-for="item in goodsArr"
              :key="item.id"
              :value="item.id"
              :label="item.goodsname"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="seckInfo.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//引入封装好的接口
import {
  getSeckAdd,
  getSeckInfo,
  getSeckEdit,
  getGoodsList,
} from "../../util/axios";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      seckInfo: {
        title: "", //秒杀名称
        begintime: "", //开始时间
        endtime: "", //结束时间
        first_cateid: "", //商品一级分类编号
        second_cateid: "", //商品二级分类编号
        goodsid: "", //商品编号
        status: 1, //状态1正常2禁用
      },
      formLabelWidth: "120px", //label宽度
      //规则验证
      rules: {
        title: [
          { required: true, message: "请输入秒杀名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
      },
      timer: null, //时间的数据绑定
      secondArr: [], //二级分类
      goodsArr: [], //商品列表数组
    };
  },
  props: ["diaInfo"],
  computed: {
    ...mapGetters({
      catelist: "goodscate/getCateList",
    }),
  },
  mounted() {
    //组件一加载就获取分类列表
    this.getCateList();
  },
  methods: {
    //创建一个切换一级分类触发的事件
    changeCate(n) {
      let index = this.catelist.findIndex(
        (item) => item.id == this.seckInfo.first_cateid
      );
      this.secondArr = this.catelist[index].children;
      // console.log(this.secondArr,'二级分类');
      if (!n) {
        //场景：切换一级分类 清空二级数据绑定 清空商品
        this.seckInfo.second_cateid = "";
        this.seckInfo.goodsid = "";
      }
    },
    //创建一个切换二级分类渲染商品列表事件
    changeGoods(n) {
      getGoodsList({
        fid: this.seckInfo.first_cateid,
        sid: this.seckInfo.second_cateid,
      }).then((res) => {
        console.log(res, "商品列表");
        if (res.code == 200) {
          this.goodsArr = res.list;
        }
      });
      if (!n) {
        this.seckInfo.goodsid = "";
      }
    },
    ...mapActions({
      getCateList: "goodscate/getCateListAction",
      getSeckList: "seck/getSeckListAction",
    }),
    //封装一个关闭弹框事件
    cancel() {
      this.$emit("cancel", false);
      //调用重置事件
      this.reset();
    },
    //封装一个重置事件
    reset() {
      this.seckInfo = {
        title: "", //秒杀名称
        begintime: "", //开始时间
        endtime: "", //结束时间
        first_cateid: "", //商品一级分类编号
        second_cateid: "", //商品二级分类编号
        goodsid: "", //商品编号
        status: 1, //状态1正常2禁用
      };
      //调用清空验证的方法
      this.$refs.seckInfo.resetFields();
      //清空事件数据绑定属性
      this.timer = null;
    },
    //封装一个查询单条事件
    lookup(id) {
      getSeckInfo({ id }).then((res) => {
        if (res.code == 200) {
          this.seckInfo = res.list;
          this.seckInfo.id = id;
          //对时间数据进行二次转化
          this.timer = [
            new Date(parseInt(this.seckInfo.begintime)),
            new Date(parseInt(this.seckInfo.endtime)),
          ];
          this.changeCate(true)
          this.changeGoods(true)
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //封装一个确定弹框事件
    confirm() {
      //调用验证器
      this.$refs.seckInfo.validate((val) => {
        if (val) {
          //事件 [Wed Apr 21 2021 00:00:00 GMT+0800 (中国标准时间), Wed Apr 21 2021 23:00:00 GMT+0800 (中国标准时间), __ob__: Observer] 东八区的数组
          //后端需要的是分开的字符串，实际上要 时间戳
          this.seckInfo.begintime = new Date(this.timer[0]).getTime();
          this.seckInfo.endtime = new Date(this.timer[1]).getTime();
          //数据处理 主要处理时间
          // console.log(this.timer,'时间');
          // console.log(this.seckInfo,'seckInfo');
          if (this.diaInfo.isAdd) {
            // //添加接口
            getSeckAdd(this.seckInfo).then((res) => {
              if (res.code == 200) {
                //关闭弹框 清空验证
                this.cancel();
                //重新触发行动
                this.getSeckList();
              } else {
                this.$message.error(res.msg);
              }
            });
          } else {
            //编辑接口
            getSeckEdit(this.seckInfo).then((res) => {
              if (res.code === 200) {
                //关闭弹框 清空验证
                this.cancel();
                //重新触发行动
                this.getSeckList();
              } else {
                this.$message.error(res.msg);
              }
            });
          }
        }
      });
    },
  },
};
</script>

<style scoped></style>
