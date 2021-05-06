<template>
  <div>
    <el-table :data="goodslist" border style="width: 100%">
      <el-table-column prop="id" label="商品编号" width="80px">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称"> </el-table-column>
      <el-table-column label="商品价格" width="80px" prop="price"> </el-table-column>
      <el-table-column label="市场价格" width="80px" prop="market_price"> </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="item">
          <div>
            <img class='imgInfo' :src="item.row.img? $imgUrl+item.row.img:defaultImg" alt="">
          </div>
        </template>
         </el-table-column>
      <el-table-column label="是否新品" width="80px"> 
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.isnew == 1" type="success">是</el-tag>
            <el-tag v-else type="danger">否</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="是否热卖" width="80px">
                <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.ishot == 1" type="success">是</el-tag>
            <el-tag v-else type="danger">否</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100px">
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.status == 1" type="success">启用</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <div>
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="edit(item.row.id)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              @click="del(item.row.id)"
              size="mini"
              icon="el-icon-delete"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页视图 -->
    <el-pagination
      :page-size="size"
      @current-change="onChange"
      background
      layout="prev, pager, next"
      :total="count"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getGoodsDelete } from "../../util/axios";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      defaultImg:require('../../assets/images/default.jpg')
    }
  },
  mounted() {
    //页面一加载调用接口列表和总条数
    this.getGoods();
    this.getCount();
  },
  computed: {
    ...mapGetters({
      goodslist: "goods/getGoodsList",
      size: "goods/getSize",
      count: "goods/getCount",
    }),
  },
  methods: {
    //页码切换触发的方式
    onChange(e) {
      //e 当前页码
      //触发修改页面的行动
      //  this.$store.dispatch('changePageAction',e)
      this.changePage(e);
    },
    ...mapActions({
      getGoods: "goods/getGoodsAction",
      getCount: "goods/getCountAction",
      changePage: "goods/changePageAction",
    }),
    //封装一个编辑事件
    edit(id) {
      //把id传递给父组件
      this.$emit("edit", id);
    },
    //封装一个山删除事件
    del(id) {
      this.$confirm("你确定要删除这条数据吗？？？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          getGoodsDelete({ id }).then((res) => {
            if (res.code == 200) {
              this.$message.success(res.msg);
              //重新获取列表
              this.getGoods();
              //重新调用总数
              this.getCount()
            } else {
              this.$message.error(res.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style scoped>
.imgInfo {
  width: 120px;
  height: 120px;
}
</style>
