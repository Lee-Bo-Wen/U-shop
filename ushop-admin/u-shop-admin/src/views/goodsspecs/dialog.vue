<template>
  <div>
    <el-dialog
      :title="diaInfo.isAdd ? '添加规格' : '编辑规格'"
      :visible.sync="diaInfo.isShow"
      :before-close="cancel"
      center
    >
      <el-form :model="specsInfo" :rules="rules" ref="specsInfo">
        <el-form-item
          label="商品规格名称"
          :label-width="formLabelWidth"
          prop="specsname"
        >
          <el-input v-model="specsInfo.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="规格属性"
          :label-width="formLabelWidth"
          v-for="(item, idx) in attrArr"
          :key="idx"
        >
          <!-- {{attrArr[idx]}}
                  :prop="'domains.' + idx + '.value'"
          :rules="{
            required: true,
            message: '规格属性不能为空',
            trigger: 'blur',
          }" -->
          <el-input
            style="width:75%"
            v-model="item.value"
            autocomplete="off"
          ></el-input>
          <el-button v-if="idx == 0" @click="addInp" type="primary"
            >新增规格属性</el-button
          >
          <el-button v-else @click="delInp(idx)" type="danger">删除</el-button>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="specsInfo.status"
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
import { getSpecsAdd, getSpecsInfo, getSpecsEdit } from "../../util/axios";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      specsInfo: {
        specsname: "", //商品规格名称
        attrs: "", //规格属性值
        status: 1, //状态1正常2禁用
      },
      formLabelWidth: "120px", //label宽度
      //规则验证
      rules: {
        specsname: [
          { required: true, message: "请输入商品规格名称", trigger: "blur" },
          {
            min: 2,
            max: 15,
            message: "长度在 2 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
      //用于动态增减表单项
      attrArr: [
        {
          value: "",
        },
      ],
    };
  },
  props: ["diaInfo"],
  methods: {
    //封装一个动态添加 input 事件
    addInp() {
      //场景的限制，最多添加6次
      if (this.attrArr.length < 6) {
        this.attrArr.push({
          value: "",
        });
      } else {
        this.$message.warning("最多添加6个input框！！！");
      }
    },
    //删除input
    delInp(i) {
      this.attrArr.splice(i, 1);
    },
    ...mapActions({
      getSpecsList: "goodsspecs/getSpecsListAction",
      getCount: "goodsspecs/getCountAction",
    }),
    //封装一个关闭弹框事件
    cancel() {
      this.$emit("cancel", false);
      //调用重置事件
      this.reset();
    },
    //封装一个重置事件
    reset() {
      this.specsInfo = {
        specsname: "", //商品规格名称
        attrs: "", //规格属性值
        status: 1, //状态1正常2禁用
      };
      //清空验证规则
      this.$refs.specsInfo.resetFields();
      //重置动态表单增减
      this.attrArr= [
        {
          value: "",
        },
      ]
    },
    //封装一个查询单条事件
    lookup(id) {
      getSpecsInfo({ id }).then((res) => {
        if (res.code === 200) {
          this.specsInfo = res.list[0];
          this.specsInfo.id = id;
          console.log(this.specsInfo.attrs, "属性数组");
          // input做了双向数据绑定， this.attrArr = [{value:''}]
          this.specsInfo.attrs.map((item, idx) => {
            console.log(item, "数组中的每一项");
            //针对于默认第一项进项单独赋值
            if (idx == 0) {
              this.attrArr[0].value = item;
            } else {
              this.attrArr.push({
                value: item,
              });
            }
          });
        }
      });
    },
    //封装一个确定弹框事件
    confirm() {
      //调用验证器
      this.$refs.specsInfo.validate((val) => {
        if (val) {
          console.log(this.attrArr, "规格属性数组");
          console.log(this.specsInfo, "specsInfo");
          //后端的需求： attrs商品规格属性值string"['白色','红色‘，’黄色‘]"
          // 我们现在的数据个是 [{value:'1'},{value:'2'}]
          //映射一个新数组
          //  let result = this.attrArr.map(item=>item.value)
          //  console.log(result,'result');
          //  this.specsInfo.attrs =JSON.stringify(this.attrArr.map(item => item.value))
          this.specsInfo.attrs = this.attrArr
            .map((item) => item.value)
            .join(",");
          //调用接口
          if (this.diaInfo.isAdd) {
            // //添加接口
            getSpecsAdd(this.specsInfo).then((res) => {
              console.log(res, "添加规格");
              if (res.code == 200) {
                //关闭弹框 清空验证
                this.cancel();
                //刷新列表
                // location.reload();
                //重新触发行动
                this.getSpecsList();
                this.getCount();
              }
            });
          } else {
            //编辑接口
            getSpecsEdit(this.specsInfo).then((res) => {
              if (res.code === 200) {
                //关闭弹框 清空验证
                this.cancel();
                //刷新列表
                // location.reload();
                //重新触发行动
                this.getSpecsList();
                this.getCount();
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
