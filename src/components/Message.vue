<template>
  <el-row>
    <el-col>
      <el-col>
        <el-button :plain="true" @click="open">打开消息提示</el-button>
        <el-button :plain="true" @click="openVn">我是消息按钮</el-button>
      </el-col>

      <el-col>
        <el-button :plain="true" @click="succeess()">成功</el-button>
        <el-button :plain="true" @click="warning()">警告</el-button>
        <el-button :plain="true" @click="message()">消息</el-button>
        <el-button :plain="true" @click="error()">错误</el-button>
      </el-col>


      <el-col class="box">
  <el-col class="top">
    <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
      <el-button>上左</el-button>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="Top Center 提示文字" placement="top">
      <el-button>上边</el-button>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="Top Right 提示文字" placement="top-end">
      <el-button>上右</el-button>
    </el-tooltip>
  </el-col>
  <el-col class="left">
    <el-tooltip class="item" effect="dark" content="Left Top 提示文字" placement="left-start">
      <el-button>左上</el-button>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="Left Center 提示文字" placement="left">
      <el-button>左边</el-button>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="Left Bottom 提示文字" placement="left-end">
      <el-button>左下</el-button>
    </el-tooltip>
  </el-col>

  <el-col class="right">
    <el-tooltip class="item" effect="dark" content="Right Top 提示文字" placement="right-start">
      <el-button>右上</el-button>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
      <el-button>右边</el-button>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="Right Bottom 提示文字" placement="right-end">
      <el-button>右下</el-button>
    </el-tooltip>
  </el-col>
  <el-col class="bottom">
    <el-tooltip class="item" effect="dark" content="Bottom Left 提示文字" placement="bottom-start">
      <el-button>下左</el-button>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="Bottom Center 提示文字" placement="bottom">
      <el-button>下边</el-button>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="Bottom Right 提示文字" placement="bottom-end">
      <el-button>下右</el-button>
    </el-tooltip>
  </el-col>
</el-col>
    </el-col>
  </el-row>
</template>

<script>
export default {
  methods: {
    open() {
      this.$message("这是一条消息提示");
    },

    openVn() {
      const h = this.$createElement;
      this.$message({
        message: h("p", null, [
          h("span", null, "我在这里 "),
          h("i", { style: "color: teal" })
        ])
      });
    },
    message() {
      this.$message("这是一条消息提示");
    },
    succeess() {
      this.$message({
        message: "恭喜你，这是一条成功消息",
        type: "success"
      });
    },

    warning() {
      this.$message({
        message: "警告哦，这是一条警告消息",
        type: "warning"
      });
    },

    error() {
      this.$message.error("错了哦，这是一条错误消息");
    }
  }
};
</script>

<style lang="scss" scoped>
.el-col {
  border-radius: 4px;
  margin-top: 20px;
}

.box {
  
    width: 400px;

    .top {
      text-align: center;
    }

    .left {
      float: left;
      width: 60px;
    }

    .right {
      float: right;
      width: 60px;
    }

    .bottom {
      clear: both;
      text-align: center;
    }
     .item {
      margin: 4px;
    }

    .left .el-tooltip__popper,
    .right .el-tooltip__popper {
      padding: 8px 10px;
    }
  
}
</style>

