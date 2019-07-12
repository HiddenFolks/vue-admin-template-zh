<template>
  <section class="chart-container">
    <el-row>
      <el-col :span="12">
        <div :style="{height:'400px',width:'100%'}" ref="myEchart"></div>
      </el-col>
      <el-col :span="12">
        <div :style="{height:'400px',width:'100%'}" ref="myEchart1"></div>
      </el-col>
      <el-col :span="12">
        <div :style="{ height:'400px',width:'100%'}" ref="charBar"></div>
      </el-col>
      <el-col :span="12">
        <div :style="{ height:'400px',width:'100%'}" ref="chartLine"></div>
      </el-col>
    </el-row>
  </section>
</template>
<script>
import echarts from "echarts";
import "echarts/map/js/china.js"; // 引入中国地图数据
export default {
  props: ["renderData", "userJson"],
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    this.initEchartMap();
    this.chinaConfigure();
    this.charBar();
    this.drawLineChart();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    drawLineChart() {
      this.chartLine = echarts.init(this.$refs.chartLine);
      this.chartLine.setOption({
        title: {
          text: "折线图"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["邮件营销", "联盟广告", "搜索引擎"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      });
    },
    charBar() {
      let myChart = echarts.init(this.$refs.charBar);
      myChart.setOption({
        backgroundColor: "#45515a",
        //标题
        title: {
          text: "流量来源",
          subtext: "饼图示例",
          left: "center",
          top: 20,
          textStyle: {
            color: "#ccc",
            fontStyle: "italic" //标题字体
          }
        },
        //弹窗，响应鼠标指向，显示具体细节
        tooltip: {
          trigger: "item", //以具体项目触发弹窗
          /*
    内容格式器，一共有abcd四个代号，例如在饼图中，{a}指系列，即流量来源，{b}指数据项目，如搜索引擎，{c}指数值，如
    value，{d}百分比。{x}本身代表了相应字符，可以和其他字符拼凑，在弹窗中显示
    */
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        //图例，选择要显示的项目
        legend: {
          orient: "vertical",
          left: "left",
          textStyle: {
            color: "#c8c8d0"
          },
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"] //注意要和数据的name相对应
        },
        //工具箱
        toolbox: {
          show: true, //显示工具箱
          feature: {
            dataView: { show: true }, //以文字形式显示数据
            restore: { show: true }, //还原
            //dataZoom:{show:true}, //区域缩放
            saveAsImage: { show: true } //保存图片
            //magicType:{type:['line','bar']}//动态数据切换，数据显示可以在该规定内容中切换显示方式，
          }
        },
        //视觉映射组件，将数据映射到视觉元素上
        visualMap: {
          show: false,
          min: 10,
          max: 650,
          dimension: 0, //选取数据的维度，如人数据：[身高，体重]，则1代表将体重进行映射，默认值为数组的最后一位
          // seriesIndex: 4, //选取数据集合中的哪个数组，如{一班}，{二班}，默认选取data中的所有数据集
          inRange: {
            //选定了要映射的对象，用inRange详细写要渲染的具体细节，[x，y]中x指最小值对应的量（亮度，饱和度等），y指最大值对应的量，其余的按各自value线性渲染
            color: ["red"],
            colorLightness: [0, 1],
            colorSaturation: [0, 1]
          }
        },
        //数据
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 274, name: "联盟广告" },
              { value: 235, name: "视频广告" },
              { value: 400, name: "搜索引擎" }
            ].sort(function(a, b) {
              return a.value - b.value;
            }),
            roseType: "radius", //角度和半径展现百分比，'area'只用半径展现
            label: {
              //饼图图形的文本标签
              normal: {
                //下同，normal指在普通情况下样式，而非高亮时样式
                textStyle: {
                  color: "rgba(255, 255, 255, 0.3)"
                }
              }
            },
            labelLine: {
              //引导线样式
              normal: {
                lineStyle: {
                  color: "rgba(255, 255, 255, 0.3)"
                },
                smooth: 0.5, //0-1，越大越平滑弯曲
                length: 10, //从块到文字的第一段长
                length2: 20 //拐弯到文字的段长
              }
            },
            itemStyle: {
              //图例样式
              normal: {
                color: "#97413c",
                shadowBlur: 50, //阴影模糊程度
                shadowColor: "rgba(0, 0, 0, 0.5)" //阴影颜色，一般黑
              }
            },

            animationType: "scale", //初始动画效果，scale是缩放，expansion是展开
            animationEasing: "elasticOut", //初始动画缓动效果
            animationDelay: function(idx) {
              //数据更新动画时长，idx限定了每个数据块从无到有的速度
              return Math.random() * 200;
            }
          }
        ]
      });
    },

    chinaConfigure() {
      console.log(this.userJson);
      let myChart = echarts.init(this.$refs.myEchart1); //这里是为了获得容器所在位置
      window.onresize = myChart.resize;
      myChart.setOption({
        // 进行相关配置
        title: {
          text: "在线用户分布",
          left: "center",
          textStyle: {
            color: "#fff"
          }
        },
        backgroundColor: "#02AFDB",
        tooltip: {}, // 鼠标移到图里面的浮动提示框
        dataRange: {
          show: false,
          min: 0,
          max: 1000,
          text: ["High", "Low"],
          realtime: true,
          calculable: true,
          color: ["orangered", "yellow", "lightskyblue"]
        },
        geo: {
          // 这个是重点配置区
          map: "china", // 表示中国地图
          roam: true,
          label: {
            normal: {
              show: true, // 是否显示对应地名
              textStyle: {
                color: "rgba(0,0,0,0.4)"
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: "rgba(0, 0, 0, 0.2)"
            },
            emphasis: {
              areaColor: null,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        },
        series: [
          {
            type: "scatter",
            coordinateSystem: "geo" // 对应上方配置
          },
          {
            name: "启动次数", // 浮动框的标题
            type: "map",
            geoIndex: 0,
            data: [
              {
                name: "北京",
                value: 599
              },
              {
                name: "上海",
                value: 142
              },
              {
                name: "黑龙江",
                value: 44
              },
              {
                name: "深圳",
                value: 92
              },
              {
                name: "湖北",
                value: 810
              },
              {
                name: "四川",
                value: 453
              },
              {
                name: "广东",
                value: 999
              }
            ]
          }
        ]
      });
    },

    initEchartMap() {
      //console.log(this.renderData)
      //这里用固定的数据，真正使用时，用父组件传递来的数据替换series即可
      let myChart = echarts.init(this.$refs.myEchart);
      window.onresize = myChart.resize;
      myChart.setOption({
        backgroundColor: "#0b1225",
        title: {
          text: "迁移地图",
          left: "center",
          textStyle: {
            color: "#fff"
          }
        },
        tooltip: {
          trigger: "item"
        },
        dataRange: {
          show: false,
          min: 0,
          max: 1000,
          text: ["High", "Low"],
          realtime: true,
          calculable: true,
          color: ["orangered", "yellow", "lightskyblue"]
        },
        visualMap: {
          show: true,
          min: 0,
          max: 255,
          calculable: true,
          inRange: {
            color: ["aqua", "lime", "yellow", "orange", "#ff3333"]
          },
          textStyle: {
            color: "#12223b"
          }
        },
        geo: {
          // 这个是重点配置区
          map: "china", // 表示中国地图
          roam: true,
          layoutCenter: ["50%", "50%"],
          layoutSize: "130%",
          label: {
            normal: {
              show: true, // 是否显示对应地名
              textStyle: {
                color: "rgba(0,0,0,0.4)"
              }
            }
          },
          itemStyle: {
            normal: {
              areaColor: "#37376e",
              borderColor: "rgba(0, 0, 0, 0.2)"
            },
            emphasis: {
              areaColor: null,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        },
        series: [
          {
            type: "lines",
            zlevel: 2,
            effect: {
              show: true,
              period: 4,
              trailLength: 0.02,
              symbol: "arrow",
              symbolSize: 5
            },
            lineStyle: {
              normal: {
                width: 1,
                opacity: 0.6,
                curveness: 0.2
              }
            },
            tooltip: {
              trigger: "item"
            },
            data: [
              {
                fromName: "广东",
                toName: "江苏",
                value: 19,
                coords: [[113.511, 23.22], ["119.68", "33.199"]]
              },
              {
                fromName: "广东",
                toName: "安徽",
                value: 17,
                coords: [[113.511, 23.22], ["117.229", "31.917"]]
              },
              {
                fromName: "广东",
                toName: "上海",
                value: 25,
                coords: [[113.511, 23.22], ["121.465", "31.289"]]
              },
              {
                fromName: "广东",
                toName: "湖北",
                value: 31,
                coords: [[113.511, 23.22], ["114.39", "30.663"]]
              },
              {
                fromName: "广东",
                toName: "福建",
                value: 12,
                coords: [[113.511, 23.22], ["119.454", "25.922"]]
              },
              {
                fromName: "广东",
                toName: "浙江",
                value: 19,
                coords: [[113.511, 23.22], ["119.531", "29.877"]]
              },
              {
                fromName: "广东",
                toName: "陕西",
                value: 18,
                coords: [[113.511, 23.22], ["109.116", "34.2"]]
              },
              {
                fromName: "广东",
                toName: "河南",
                value: 15,
                coords: [[113.511, 23.22], ["113.467", "34.623"]]
              },
              {
                fromName: "广东",
                toName: "山东",
                value: 12,
                coords: [[113.511, 23.22], ["116.972", "36.737"]]
              },
              {
                fromName: "广东",
                toName: "新疆",
                value: 12,
                coords: [[113.511, 23.22], [86.61, 40.79]]
              },
              {
                fromName: "广东",
                toName: "四川",
                value: 10,
                coords: [[113.511, 23.22], ["103.953", "30.762"]]
              },
              {
                fromName: "广东",
                toName: "江西",
                value: 9,
                coords: [[113.511, 23.22], ["116.005", "28.663"]]
              },
              {
                fromName: "广东",
                toName: "重庆",
                value: 8,
                coords: [[113.511, 23.22], ["106.438", "29.581"]]
              },
              {
                fromName: "广东",
                toName: "贵州",
                value: 4,
                coords: [[113.511, 23.22], ["106.71", "26.564"]]
              },
              {
                fromName: "广东",
                toName: "山西",
                value: 4,
                coords: [[113.511, 23.22], ["112.593", "37.867"]]
              },
              {
                fromName: "广东",
                toName: "湖南",
                value: 4,
                coords: [[113.511, 23.22], ["113.082", "28.257"]]
              },
              {
                fromName: "广东",
                toName: "吉林",
                value: 3,
                coords: [[113.511, 23.22], ["125.815", "44.258"]]
              },
              {
                fromName: "广东",
                toName: "广西",
                value: 2,
                coords: [[113.511, 23.22], ["107.88", "22.863"]]
              }
            ]
          },
          {
            name: "收货地址",
            type: "effectScatter",
            coordinateSystem: "geo",
            zlevel: 2,
            rippleEffect: {
              period: 4,
              brushType: "stroke",
              scale: 4
            },
            tooltip: {
              trigger: "item"
            },
            label: {
              normal: {
                show: true,
                position: "left",
                offset: [-5, 5],
                formatter: "{b}"
              },
              emphasis: {
                show: true
              }
            },
            hoverAnimation: true,
            symbol: "circle",
            symbolSize: 5,
            itemStyle: {
              normal: {
                show: false,
                color: "#f00"
              }
            },
            data: [
              {
                name: "江苏",
                value: ["119.68", "33.199", 19]
              },
              {
                name: "安徽",
                value: ["117.229", "31.917", 17]
              },
              {
                name: "上海",
                value: ["121.465", "31.289", 25]
              },
              {
                name: "湖北",
                value: ["114.39", "30.663", 31]
              },
              {
                name: "福建",
                value: ["119.454", "25.922", 22]
              },
              {
                name: "浙江",
                value: ["119.531", "29.877", 19]
              },
              {
                name: "陕西",
                value: ["109.116", "34.2", 18]
              },
              {
                name: "河南",
                value: ["113.467", "34.623", 15]
              },
              {
                name: "山东",
                value: ["116.972", "36.737", 12]
              },
              {
                name: "新疆",
                value: ["86.61", "40.79", 12]
              },
              {
                name: "四川",
                value: ["103.953", "30.762", 10]
              },
              {
                name: "江西",
                value: ["116.005", "28.663", 9]
              },
              {
                name: "重庆",
                value: ["106.438", "29.581", 8]
              },
              {
                name: "贵州",
                value: ["106.71", "26.564", 4]
              },
              {
                name: "山西",
                value: ["112.593", "37.867", 4]
              },
              {
                name: "湖南",
                value: ["113.082", "28.257", 4]
              },
              {
                name: "吉林",
                value: ["125.815", "44.258", 3]
              },
              {
                name: "广西",
                value: ["107.88", "22.863", 2]
              }
            ]
          },
          {
            name: "发送地址",
            type: "scatter",
            coordinateSystem: "geo",
            zlevel: 2,
            tooltip: {
              trigger: "item"
            },
            label: {
              normal: {
                show: true,
                position: "right",
                color: "#00ffff",
                formatter: "{b}",
                textStyle: {
                  color: "#00ffff"
                }
              },
              emphasis: {
                show: true
              }
            },
            symbol: "circle",
            symbolSize: 20,
            itemStyle: {
              normal: {
                show: true,
                color: "#EE0000"
              }
            },
            data: [
              {
                name: "广东",
                value: [113.511, 23.22]
              }
            ]
          }
        ]
      });
    }
  }
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  float: left;
}

.el-col {
  padding: 30px 20px;
}
</style>
