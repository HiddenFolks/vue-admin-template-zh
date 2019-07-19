<template>
  <el-row class="content-box" >
    <el-col :span="16">
      <el-button @click="show = !show">点我</el-button>

      <div style="display: flex; margin-top: 20px; height: 100px;">
        <transition name="el-fade-in-linear">
          <div v-show="show" class="transition-box">transition动画</div>
        </transition>
        <transition name="el-fade-in">
          <div v-show="show" class="transition-box">transition动画</div>
        </transition>
      </div>
    </el-col>
    <el-col>
      <el-button @click="show2 = !show2">点我</el-button>

      <div style="display: flex; margin-top: 20px; height: 100px;">
        <transition name="el-zoom-in-center">
          <div v-show="show2" class="transition-box1">transition动画</div>
        </transition>

        <transition name="el-zoom-in-top">
          <div v-show="show2" class="transition-box1">transition动画</div>
        </transition>

        <transition name="el-zoom-in-bottom">
          <div v-show="show2" class="transition-box1">transition动画</div>
        </transition>
      </div>
    </el-col>

    <el-col>
      <el-button @click="show3 = !show3">点我</el-button>
      <div style="margin-top:20px; height:200px;">
        <el-collapse-transition>
          <div v-show="show3">
            <div class="transition-box2">transition动画</div>
            <div class="transition-box2">transition动画</div>
          </div>
        </el-collapse-transition>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data: () => ({
    show: false,
    show2: false,
    show3: false
  })
};
</script>

<style scoped>
.el-col {
  border-radius: 4px;
  margin-top: 20px;
}
.transition-box {
  margin-bottom: 10px;
  width: 200px;
  height: 100px;
  border-radius: 4px;
  background-color: #409eff;
  text-align: center;
  color: #fff;
  padding: 40px 20px;
  box-sizing: border-box;
  margin-right: 20px;
}

.transition-box1 {
  margin-bottom: 10px;
  width: 200px;
  height: 100px;
  border-radius: 4px;
  background-color: #409eff;
  text-align: center;
  color: #fff;
  padding: 40px 20px;
  box-sizing: border-box;
  margin-right: 20px;
}
.transition-box2 {
  margin-bottom: 10px;
  width: 200px;
  height: 100;
  border-radius: 4px;
  background-color: #409eff;
  text-align: center;
  color: #fff;
  padding: 40px 20px;
  box-sizing: border-box;
  margin-right: 20px;
}
.content-box{
  display: flex;
  
}
</style>