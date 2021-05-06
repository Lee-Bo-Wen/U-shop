<template>
  <div>
    <div id="main"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {};
  },
  mounted() {
    //当组件一加载就渲染 数据图表（数据可视化）
    var app = {};

    var chartDom = document.getElementById("main");
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      title: {
        text: "商城数据实时监控",
        subtext: "",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#283b56",
          },
        },
      },
      legend: {
        data: ["浏览人数", "成交单量"],
      },
      toolbox: {
        show: true,
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {},
        },
      },
      dataZoom: {
        show: false,
        start: 0,
        end: 100,
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: true,
          data: (function () {
            var now = new Date();
            var res = [];
            var len = 10;
            while (len--) {
              res.unshift(now.toLocaleTimeString().replace(/^\D*/, ""));
              now = new Date(now - 2000);
            }
            return res;
          })(),
        },
        {
          type: "category",
          boundaryGap: true,
          data: (function () {
            var res = [];
            var len = 10;
            while (len--) {
              res.push(10 - len - 1);
            }
            return res;
          })(),
        },
      ],
      yAxis: [
        {
          type: "value",
          scale: true,
          name: "价格",
          max: 30,
          min: 0,
          boundaryGap: [0.2, 0.2],
        },
        {
          type: "value",
          scale: true,
          name: "预购量",
          max: 1200,
          min: 0,
          boundaryGap: [0.2, 0.2],
        },
      ],
      series: [
        {
          name: "成交单量",
          type: "bar",
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: (function () {
            var res = [];
            var len = 10;
            while (len--) {
              res.push(Math.round(Math.random() * 1000));
            }
            return res;
          })(),
        },
        {
          name: "浏览人数",
          type: "line",
          data: (function () {
            var res = [];
            var len = 0;
            while (len < 10) {
              res.push((Math.random() * 10 + 5).toFixed(1) - 0);
              len++;
            }
            return res;
          })(),
        },
      ],
    };

    app.count = 11;
    setInterval(function () {
      var axisData = new Date().toLocaleTimeString().replace(/^\D*/, "");

      var data0 = option.series[0].data;
      var data1 = option.series[1].data;
      data0.shift();
      data0.push(Math.round(Math.random() * 1000));
      data1.shift();
      data1.push((Math.random() * 10 + 5).toFixed(1) - 0);

      option.xAxis[0].data.shift();
      option.xAxis[0].data.push(axisData);
      option.xAxis[1].data.shift();
      option.xAxis[1].data.push(app.count++);

      myChart.setOption(option);
    }, 2100);

    option && myChart.setOption(option);
  },
};
</script>

<style lang="stylus" scoped>
#main {
  width: 1000px;
  height: 500px;
}
</style>
