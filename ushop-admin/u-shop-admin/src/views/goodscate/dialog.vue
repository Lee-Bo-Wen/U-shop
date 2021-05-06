<template>
  <div>
    <el-dialog
      :title="diaInfo.isAdd ? '添加分类' : '编辑分类'"
      :visible.sync="diaInfo.isShow"
      :before-close="cancel"
      center
    >
      <el-form :model="cateInfo" :rules="rules" ref="cateInfo">
        <el-form-item label="上级分类" :label-width="formLabelWidth" prop="pid">
          <el-select v-model="cateInfo.pid" placeholder="请选择">
            <el-option label="上级分类" :value="0"></el-option>
            <el-option
              v-for="item in catelist"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="分类名称"
          :label-width="formLabelWidth"
          prop="catename"
        >
          <el-input v-model="cateInfo.catename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          v-if="cateInfo.pid != 0"
          label="图片"
          :label-width="formLabelWidth"
        >
          <!--
            上传图片两种场景：
            一、后端直接提供服务器地址 直接用action挂地址
            二、通过调取接口上传，action = '#',通过接口与服务端进行交互
            图片上传视图 
           el-upload
           action	必选参数，上传的地址
           on-preview	点击文件列表中已上传的文件时的钩子 查看
           on-remove	文件列表移除文件时的钩子 删除
           list-type	文件列表的类型
           auto-upload	是否在选取文件后立即进行上传 默认是true
           on-change	文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
           file-list	上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]
           on-exceed	文件超出个数限制时的钩子	function(files, fileList)	—
           limit	最大允许上传个数
          -->
          <el-upload
            action="#"
            list-type="picture-card"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :auto-upload="false"
            :on-change= 'onChange'
            :file-list = 'fileList'
            :limit='1'
            :on-exceed='onExceed'
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <!-- 展示图片 -->
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="cateInfo.status"
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
import { addCate, getCateInfo, postEditCate } from "../../util/axios";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      cateInfo: {
        pid: 0, //上级分类编号
        catename: "", //分类名称
        img: "", //图片(文件，一般用于二级分类)
        status: 1, //状态1正常2禁用
      },
      formLabelWidth: "120px", //label宽度
      //规则验证
      rules: {
        catename: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
        pid: [{ required: true, message: "请选择上级分类", trigger: "change" }],
      },
      dialogImageUrl: "", //图片展示的属性
      dialogVisible: false, //控制图片展示的弹框
      fileList:[],//用来回显图片，存储图片数据的
    };
  },
  props: ["diaInfo"],
  computed: {
    ...mapGetters({
      catelist: "goodscate/getCateList",
    }),
  },
  methods: {
    //onExceed 超出限制之后，会触发这个函数，这个函数主要是提示作用
    onExceed(files,fileList){
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    //图片上传或者改变的时候触发的函数
    onChange(file,filelist){
      console.log(file, filelist, "改变");
      //raw 包含了 图片的基本信息，大小，名称，修改时间，类型。。。
      this.cateInfo.img = file.raw
    },
    //移除
    handleRemove(file, fileList) {
      console.log(file, fileList, "移除");
    },
    //查看
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    ...mapActions({
      getCateList: "goodscate/getCateListAction",
    }),
    //封装一个关闭弹框事件
    cancel() {
      this.$emit("cancel", false);
      //调用重置事件
      this.reset();
    },
    //封装一个重置事件
    reset() {
      this.cateInfo = {
        pid: 0, //上级分类编号
        catename: "", //分类名称
        img: "", //图片(文件，一般用于二级分类)
        status: 1, //状态1正常2禁用
      };
      //清空验证规则
      this.$refs.cateInfo.resetFields();
    },
    //封装一个查询单条事件
    lookup(id) {
      getCateInfo({ id }).then((res) => {
        if (res.code === 200) {
          this.cateInfo = res.list;
          this.cateInfo.id = id;
          //针对于图片进行回显
          //为什么要进行判断，因为图片并不是必填项
          //如果数据库img这个属性有值，我们就回显。否则就是[]（不回显）
          this.fileList = this.cateInfo.img? [{url:this.$imgUrl+this.cateInfo.img}]  :[]
        }
      });
    },
    //封装一个确定弹框事件
    confirm() {
      //调用验证器
      this.$refs.cateInfo.validate((val) => {
        if (val) {
          //针对于提交的表单参数进行格式转化
          let file = new FormData();
          //添加数据用append 如果你想打印取值用get
          for (let i in this.cateInfo) {
            file.append(i, this.cateInfo[i]);
          }
          // console.log(      file.get('catename'),'file');
          //调用接口
          if (this.diaInfo.isAdd) {
            console.log(this.cateInfo, "分类的表单信息");
            // //添加接口
            addCate(file).then((res) => {
              console.log(res, "添加分类");
              if (res.code == 200) {
                //关闭弹框 清空验证
                this.cancel();
                //刷新列表
                // location.reload();
                //重新触发行动
                this.getCateList();
              }
            });
          } else {
            //编辑接口
            postEditCate(file).then((res) => {
              if (res.code === 200) {
                //关闭弹框 清空验证
                this.cancel();
                //刷新列表
                // location.reload();
                //重新触发行动
                this.getCateList();
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
