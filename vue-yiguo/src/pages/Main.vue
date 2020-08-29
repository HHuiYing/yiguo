<template>
  <div>
    <h2 class="user-manage">首页</h2>
    <el-col :span="10" class="line-chart">
      <el-card shadow="hover" style="height:420px">
        鼠标悬浮时显示
      </el-card>
    </el-col>
    <el-col :span="10" class="line-chart">
      <el-card shadow="hover" style="height:420px">
        <div id="main" style="width: 500px;height: 400px;"></div>
      </el-card>
    </el-col>
  </div>
</template>

<script>
import echarts from 'echarts'
    export default {
        name: '',
        data() {
            return {
                charts: '',
            /*  opinion: ["1", "3", "3", "4", "5"],*/
                opinionData: ["3", "2", "4", "4", "5"]
            }
        },
        methods: {
            drawLine(id) {
                this.charts = echarts.init(document.getElementById(id))
                this.charts.setOption({
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['近七日收益']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
 
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                    data: ["1","2","3","4","5"]
                    
                    },
                    yAxis: {
                        type: 'value'
                    },
 
                    series: [{
                        name: '近七日收益',
                        type: 'line',
                        stack: '总量',
                        data: this.opinionData
                    }]
                })
            }
        },
        //调用
        mounted() {
            this.$nextTick(function() {
                this.drawLine('main')
            })
        }
    }

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
.line-chart{
  margin: 20px 50px;
  float: left;
}
</style>