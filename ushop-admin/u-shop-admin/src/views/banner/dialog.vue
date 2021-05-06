<template>
  <div>
    <el-dialog
      :title="diaInfo.isAdd ? '添加轮播图' : '编辑轮播图'"
      :visible.sync="diaInfo.isShow"
      :before-close="cancel"
      center
    >
      <el-form :model="bannerInfo" :rules="rules" ref="bannerInfo">
        <el-form-item
          label="轮播图标题"
          :label-width="formLabelWidth"
          prop="title"
        >
          <el-input v-model="bannerInfo.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
            action="#"
            list-type="picture-card"
            :on-preview="onPreview"
            :on-remove="handleRemove"
            :auto-upload="false"
            :on-change="onChange"
            :file-list="fileList"
            :limit="1"
            :on-exceed="onExceed"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="bannerInfo.status"
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
import { addbanner, getbannerInfo, postEditbanner } from "../../util/axios";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      bannerInfo: {
        title: "", //轮播图名称
        img: "", //图片(文件，一般用于二级轮播图)
        status: 1, //状态1正常2禁用
      },
      formLabelWidth: "120px", //label宽度
      //规则验证
      rules: {
        title: [
          { required: true, message: "请输入轮播图名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
      },
      //dialogVisible 用于控制图片预览的显示隐藏
      dialogVisible: false,
      //预览时调用的图片地址
      dialogImageUrl: "",
      imgUrl: "", //设置图片地址用于接收所有上传文件详情
      fileList: [], //用于图片回显
    };
  },
  props: ["diaInfo"],
  methods: {
    //文件限制方法
    onExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    //预览的回调函数
    onPreview(file) {
      console.log(file, "文件");
      //得到文件地址之后，把它赋值给要显示的属性
      this.dialogImageUrl = file.url;
      //打开图片预览弹框
      this.dialogVisible = true;
    },
    //移除触发的钩子函数
    handleRemove(file, fileList) {
      console.log(file, "移除", fileList);
    },
    //文件发生变化触发的回调函数
    onChange(file, fileList) {
      console.log(file, "文件详情，change时候");
      //把文件详情赋值给图片地址
      this.bannerInfo.img = file.raw;
    },
    ...mapActions({
      getBannerList: "banner/getbannerListAction",
    }),
    //封装一个关闭弹框事件
    cancel() {
      this.$emit("cancel", false);
      //调用重置事件
      this.reset();
    },
    //封装一个重置事件
    reset() {
      this.bannerInfo = {
        title: "", //轮播图名称
        img: "", //图片(文件，一般用于二级轮播图)
        status: 1, //状态1正常2禁用
      };
      //调用清空验证的方法
      this.$refs.bannerInfo.resetFields();
      //清空的时候记得把图片列表置空
      this.fileList = [];
    },
    //封装一个查询单条事件
    lookup(id) {
      getbannerInfo({ id }).then((res) => {
        if (res.code == 200) {
          this.bannerInfo = res.list;
          this.bannerInfo.id = id;
          //判断图片是否存在 实现图片的回显
          this.fileList = this.bannerInfo.img
            ? [{ url: this.$imgUrl + this.bannerInfo.img }]
            : [];
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //封装一个确定弹框事件
    confirm() {
      //调用验证器
      this.$refs.bannerInfo.validate((val) => {
        if (val) {
          //针对于提交的表单参数进行格式转化
          let file = new FormData();
          //添加数据用append 如果你想打印取值用get
          for (let i in this.bannerInfo) {
            file.append(i, this.bannerInfo[i]);
          }
          if (this.diaInfo.isAdd) {
            // //添加接口
            addbanner(file).then((res) => {
              if (res.code == 200) {
                //关闭弹框 清空验证
                this.cancel();
                //刷新列表
                // location.reload();
                //重新触发行动
                this.getBannerList();
              } else {
                this.$message.error(res.msg);
              }
            });
          } else {
            //编辑接口
            postEditbanner(file).then((res) => {
              if (res.code === 200) {
                //关闭弹框 清空验证
                this.cancel();
                //刷新列表
                // location.reload();
                //重新触发行动
                this.getBannerList();
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
