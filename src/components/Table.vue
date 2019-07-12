<template>
  <div id="app">
    <template>
      <el-carousel :interval="3000" type="card" height="200px" arrow="always">
        <el-carousel-item v-for="item in imagesbox" :key="item.id">
          <img :src="item.idView" class="image" />
        </el-carousel-item>
      </el-carousel>
    </template>

    <!--搜索框-->
    <el-row>
      <el-col :span="3" class="grid">
        <el-input v-model="input" placeholder="请输入内容" size="mini" @click.prevent="search()"></el-input>
      </el-col>
      <el-col :span="1" class="grid">
        <el-button type="success" icon="el-icon-search" size="mini">搜索</el-button>
      </el-col>
    </el-row>
    <br />
    <!--表格数据及操作-->
    <el-table
      :data="customers"
      border
      style="width: 100%"
      stripe
      ref="multipleTable"
      tooltip-effect="dark"
    >
      <!--勾选框-->
      <el-table-column type="selection" width="55"></el-table-column>
      <!--索引-->
      <el-table-column type="index" :index="indexMethod"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180" sortable></el-table-column>
      <el-table-column prop="address.city" label="地址"></el-table-column>
      <el-table-column label="编辑" width="100">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click.prevent="dialogVisible1= true"
          >编辑</el-button>
        </template>
      </el-table-column>
      <el-table-column label="删除" width="100">
        <template slot-scope="scope">
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click.prevent="remove(scope.$index,scope.rows)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <br />


<!-- 编辑界面 -->
 <el-dialog title="编辑" :visible.sync="dialogVisible1" width="30%" :before-close="handleClose">
    <div>
        <el-form ref="form" label-width="80px">
            <el-form-item label="id">
                <el-input v-model="id" disabled></el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="up_Name"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="up_Email"></el-input>
            </el-form-item>
            <el-form-item label="地址">
                <el-input v-model="up_Address"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" >立即修改</el-button>
            </el-form-item>
        </el-form>   
    </div>
  </el-dialog>


    <!-- 新增界面 -->
    <el-dialog title="添加" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <div>
        <el-form ref="form" label-width="80px">
          <el-form-item label="姓名">
            <el-input v-model="name"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="email"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="address"></el-input>
          </el-form-item>
  
          <el-form-item>
            <el-button type="primary" >立即添加</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <!--新增按钮-->
    <el-col :span="1" class="grid">
        <el-button type="success" icon="el-icon-circle-plus-outline" size="mini" round  @click.prevent="dialogVisible= true">新增</el-button>   
    </el-col>
    <!--全删按钮-->
    <el-col :span="1" class="grid">
        <el-button type="danger" icon="el-icon-delete" size="mini" round>全删</el-button>
    </el-col>
    <br />
    <!--分页条-->
    <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      dialogVisible1: false,

      up_Name:"",
      up_Email:"",
      up_Address:"",

      name: "",
      email: "",
      address: "",

      imagesbox: [
        {
          id: 0,
          idView: require("./../assets/images/lunbo1.png")
        },
        {
          id: 1,
          idView: require("./../assets/images/lunbo2.png")
        },

        {
          id: 2,
          idView: require("./../assets/images/lunbo3.png")
        }
      ],
      //查询输入框数据
      input: "",
      //导航条默认选项
      activeIndex: "1",
      activeIndex2: "1",
      //表格数据
      customers: []
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },

    fetchCustomer() {
      this.$http.get("https://jsonplaceholder.typicode.com/users").then(res => {
        this.customers = res.data;
        console.log(res.data);
      });
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    indexMethod(index) {
      return index;
    },
    search() {
      this.$http
        .get("https://jsonplaceholder.typicode.com/users/" + this.input)
        .then(result => {
          var result = result.body;
          if (result.code === 200) {
            this.list = [];
            this.list.push(result.data);
          } else {
            alert("查找失败！");
          }
        });
    },
    updateBlog(index, row) {
      this.$router.push({
        path: "/updateBlog/${customers.id}"
      });
    },
    remove(index, rows) {
      this.customers.splice(index, 1);
    }
  },
  created() {
    this.fetchCustomer();
  }
};
</script>
<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}

.el-carousel {
  margin: 0 auto;
  width: 50%;
}
.el-col {
  margin: auto;
}
</style>
