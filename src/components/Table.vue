<template>
  <div id="app">
    <template>
      <el-carousel :interval="3000" type="card" height="200px" arrow="always">
        <el-carousel-item v-for="item in imagesbox" :key="item.id">
          <img style="width:100%; height:auto;" :src="item.idView" class="image" />
        </el-carousel-item>
      </el-carousel>
   
    </template>

    <!--搜索框-->
    <el-row>
      <el-col :span="3" class="grid">
        <el-form :inline="true">
          <el-form-item>
            <el-input v-model="search" placeholder="输入关键字搜索"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <!--表格数据及操作-->
    <el-table
      :data="tables.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      border
      style="width: 100%"
      stripe
      ref="dormitoryTable"
      tooltip-effect="dark"
      highlight-current-row
      v-loading="listLoading"
      @selection-change="selsChange"
    >
      <!--勾选框-->
      <el-table-column type="selection" width="55"></el-table-column>
    
      <!--索引-->
      <el-table-column prop="id" label="ID" width="100" sortable></el-table-column>
      <el-table-column prop="name" label="姓名" width="180" sortable></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180" sortable></el-table-column>
      <el-table-column prop="address" label="地址" sortable></el-table-column>
      <el-table-column label="编辑" width="100">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click.prevent="handleEdit(scope.$index,scope.row)"
          >编辑</el-button>
        </template>
      </el-table-column>
      <el-table-column label="删除" width="100">
        <template slot-scope="scope">
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click.prevent="delRemove(scope.$index,scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <br />

    <!-- 编辑界面 -->
    <el-dialog title="编辑" :visible.sync="editFormVisible" width="30%">
      <el-form ref="eidtform" label-width="80px" v-model="editForm">
        <el-form-item label="id">
          <el-input v-model="editForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="editForm.address"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click.native="editFormVisible = false">取消</el-button>
          <el-button type="primary" @click="editCustomer">立即修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 新增界面 -->
    <el-dialog title="添加" :visible.sync="addFormVisible" width="30%">
      <div>
        <el-form :model="addForm" ref="addForm" label-width="80px">
          <el-form-item prop="name" label="姓名">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item prop="email" label="邮箱">
            <el-input v-model="addForm.email"></el-input>
          </el-form-item>
          <el-form-item prop="address" label="地址">
            <el-input v-model="addForm.address"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button @click.native="addFormVisible = false">取消</el-button>
            <el-button type="primary" @click.prevent="addCustomer" :loading="addLoading">立即添加</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <!--新增按钮-->
    <el-col :span="1" class="grid">
      <el-button
        type="success"
        icon="el-icon-circle-plus-outline"
        size="mini"
        round
        @click.prevent="addFormVisible= true"
      >新增</el-button>
    </el-col>
    <!--批量删除按钮-->
    <el-col :span="2" class="grid">
      <el-button
        type="danger"
        @click="batchRemove"
        
        icon="el-icon-delete"
        size="mini"
        round
      >批量删除</el-button>
    </el-col>
    <br />
    <!--分页条-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="customers.length"
    ></el-pagination>
  </div>
</template>
<script>
import { mcall } from "q";
export default {
  data() {
    return {
      search: "", //搜索输入框数据
      addFormVisible: false, //添加窗口
      editFormVisible: false, //编辑窗口
      addLoading: false,

      listLoading: false,

      currentPage: 1, //初始页
      pagesize: 10,

      //导航条默认选项
      activeIndex: "1",
      activeIndex2: "1",

      customers: [], //表格数据

      sels: [],

      addForm: {},
      editForm: {
        id: 0,
        name: "",
        email: "",
        address: ""
      },

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
      ]
    };
  },
  //监视table表格
  computed: {
    tables() {
      const search = this.search;

      if (search) {
        return this.customers.filter(data => {
          return Object.keys(data).some(key => {
            return (
              String(data[key])
                .toLowerCase()
                .indexOf(search) > -1
            );
          });
        });
      }
      return this.customers;
    }
  },

  methods: {
    initData() {
      //初始化列表数据
      this.$http.get(" http://localhost:3000/users").then(res => {
        this.customers = res.data;
      });
    },
    //弹出编辑框
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
      console.log(this.editForm.id);
    },
    //弹出新增框
    handleAdd: function() {
      this.addFormVisible = true;
    },

    //添加数据
    addCustomer(e) {
      if (!this.addForm.name || !this.addForm.email || !this.addForm.address) {
        alert("请添加对应的信息");
      } else {
        this.addLoading = true;
        let newCustomer = {
          name: this.addForm.name,
          email: this.addForm.email,
          address: this.addForm.address
        };
        this.$http
          .post("http://localhost:3000/users", newCustomer)
          .then(res => {
            console.log(res);
            this.addLoading = false;
            this.$message({
              message: "提交成功",
              type: "success"
            });
            this.$refs["addForm"].resetFields(); //重置表单
            this.addFormVisible = false;
            this.initData();
          });
      }
    },

    //编辑更改数据
    editCustomer(e) {
      if (
        !this.editForm.name ||
        !this.editForm.email ||
        !this.editForm.address
      ) {
        alert("请添加对应的信息");
      } else {
        this.addLoading = true;
        this.listLoading = true;
        let newCustomer = {
          id: this.editForm.id,
          name: this.editForm.name,
          email: this.editForm.email,
          address: this.editForm.address
        };
        this.$http
          .put("http://localhost:3000/users/" + this.editForm.id, newCustomer)
          .then(res => {
            console.log(res);

            this.addLoading = false;
            this.$message({
              message: "修改成功",
              type: "success"
            });

            this.editFormVisible = false;

            this.initData();
          });
      }
      this.listLoading = false;
    },

    //删除数据
    delRemove(index, row) {
      this.editForm = Object.assign({}, row);
      console.log(this.editForm.id);
      this.listLoading = true;
      this.$http
        .delete("http://localhost:3000/users/" + this.editForm.id)
        .then(res => {
          this.addLoading = false;
          this.$message({
            message: "删除成功",
            type: "success"
          });

          this.initData();
        });

      this.listLoading = false;
    },
    selsChange(sels) {
      this.sels = sels
      console.log(sels)
    },
    batchRemove() {
      var ids = this.sels.map(item => item.id).toString();
      console.log(ids)
      this.$confirm("确认删除选中记录吗？", "提示", {
        type: "warning"
      })
      
        this.initData();
   

    },

    //数据请求
    fetchCustomer() {
      this.listLoading = true;
      this.$http.get(" http://localhost:3000/users").then(res => {
        this.customers = res.data;
        console.log(res.data);
        this.listLoading = false;
      });
    },

    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },

    indexMethod(index) {
      return index;
    },

    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size;
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
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
