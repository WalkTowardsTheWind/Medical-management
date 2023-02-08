<template>
  <div class="home-index">
    <el-card class="box-card">
      <div slot="header">
        <span>治疗概况</span>
      </div>
      <div style="display: flex; justify-content: center">
        <div id="week" style="width: 30%; height: 400px"></div>
        <div id="year" style="width: 60%; height: 400px"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getCountAll } from "@/api/count";
import * as echarts from "echarts";
export default {
  data() {
    return {
      orderData: [],
      weekData: [],
      yearData: [],
    };
  },

  created() {
    this.getData();
  },

  mounted() {},

  methods: {
    

    // 获取数据
    getData() {
      return new Promise((resolve, reject) => {
        getCountAll()
          .then((response) => {
            this.orderData = response.result.orderData;
            this.weekData = response.result.weekData;
            this.yearData = response.result.yearData;
            this.drawWeek();
            this.drawYear();
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
      // try {
      //   let res = await this.$axios.get("/count/all");
      //   this.orderData = res.result.orderData;
      //   this.weekData = res.result.weekData;
      //   this.yearData = res.result.yearData;
      //   // 拿到数据之后开始画图
      //   this.drawWeek();
      //   this.drawYear();
      // } catch (error) {
      //   // todo
      // }
    },

    // 绘制周数据
    drawWeek() {
      // 获取节点
      let chartDom = document.getElementById("week");
      // 初始化
      let myChart = echarts.init(chartDom);
      let option = {
        // 标题
        title: {
          text: "本周治疗量",
          x: "center",
        },
        // 横坐标
        xAxis: {
          type: "category",
          // 横坐标数据
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        },
        // 纵坐标
        yAxis: {
          type: "value",
        },
        series: [
          {
            // 纵坐标数据
            data: this.weekData,
            type: "bar",
            // 是否显示背景
            showBackground: true,
            // 背景颜色
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
          },
        ],
      };

      myChart.setOption(option);
    },

    // 绘制年度数据
    drawYear() {
      var chartDom = document.getElementById("year");
      var myChart = echarts.init(chartDom);
      var option = {
        // 标题
        title: {
          text: "本年治疗量",
          x: "center",
        },
        // 横坐标
        xAxis: {
          type: "category",
          // 横坐标数据
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
          ],
        },
        // 纵坐标
        yAxis: {
          type: "value",
        },
        series: [
          {
            // 纵坐标数据
            data: this.yearData,
            type: "bar",
            // 是否显示背景
            showBackground: true,
            // 背景颜色
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
          },
        ],
      };

      myChart.setOption(option);
    },
  },
};
</script>

<style scoped>
.item {
  width: 7.5vw;
  height: 6vw;
  /* text-align: center; */
  line-height: 6vw;
  border: 0.01px solid black;
}

i {
  font-size: 5vw;
}
</style>
