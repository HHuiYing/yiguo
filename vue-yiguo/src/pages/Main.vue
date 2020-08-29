<template>
  <div>
    <h2 class="user-manage">首页</h2>
    <el-col :span="24" class="line-chart">
      <el-card shadow="hover" style="height:420px">
        <div id="main" style="height: 400px;"></div>
      </el-card>
    </el-col>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "",
  data() {
    return {};
  },
  methods: {
    drawLine() {
      this.charts = echarts.init(document.getElementById("main"));
      var option = {
        tooltip: {
          //设置tip提示
          trigger: "axis",
        },
        legend: {
          data: ["水果销售", "肉类销售", "海鲜销售", "蔬菜销售"],
        },

        xAxis: {
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],

          type: "category",
        },
        yAxis: {
          type: "value",
        },

        series: [
          {
            name: "水果销售",
            type: "line",
            data: [567, 980, 670, 732, 876, 921, 1021],
          },
          {
            name: "肉类销售",
            type: "line",
            data: [654, 682, 891, 434, 890, 530, 710],
          },
          {
            name: "海鲜销售",
            type: "line",
            data: [190, 1232, 801, 1254, 1190, 1330, 1310],
          },
          {
            name: "蔬菜销售",
            type: "line",
            data: [1420, 1332, 1701, 1534, 1890, 1530, 920],
          },
        ],
      };
      this.charts.setOption(option);
    },
  },
  //调用
  mounted() {
    this.$nextTick(function () {
      this.drawLine("main");
    });
  },
};
</script>
<style lang="scss" scoped>
.user-manage {
  width: 100%;
  height: 40px;
  margin: 10px 0;
  padding-left: 5px;
  background: rgb(248, 247, 247);
  border-radius: 5px;
  line-height: 40px;
  font-weight: normal;
  font-size: 18px;
  color: #008842;
}
.line-chart {
  padding: 20px;
  float: left;
}
</style>