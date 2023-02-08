<template>
  <el-card class="box-card">
    <div slot="header">
      <span>项目管理</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="handleAdd()">添加</el-button>
    </div>
    <el-table :stripe="true" :border="true" :data="projectList" style="width: 100%">
      <el-table-column :formatter="formTime" prop="createTime" label="创建日期" width="180" align="center">
      </el-table-column>
      <el-table-column :formatter="formTime2" prop="updateTime" label="修改日期" width="180" align="center">
      </el-table-column>
      <el-table-column prop="projectName" label="项目名称" width="180" align="center">
      </el-table-column>
      <el-table-column prop="projectCode" label="项目代码" width="180" align="center">
      </el-table-column>
      <el-table-column prop="projectState" label="项目状态" width="180" align="center">
        <template slot-scope="scope">
          <el-select @change="changeStatus(scope)" v-model="scope.row.projectState" placeholder="请选择">
            <el-option label="待完成" value="01"> </el-option>
            <el-option label="已完成" value="02"> </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="Department" label="科室" width="180" align="center">
      </el-table-column>
      <el-table-column prop="doctorName" label="医生" width="180" align="center">
      </el-table-column>
      <!-- <el-table-column :formatter="formRole" prop="role" label="权限">
        </el-table-column> -->
      <el-table-column label="操作" min-width="200" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>

          <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <span>确定删除《{{ projectName }}》</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="projectDelete(scope.row)">确 定</el-button>
            </span>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import {
  getProjectAll,
  getProjectDel,
  getProjectChangeStatus,
} from "@/api/project";
export default {
  data() {
    return {
      projectList: [],
      dialogVisible: false,
      projectId: "",
      projectName: "",
    };
  },
  created() {
    this.getProjectList();
  },
  methods: {
    getProjectList() {
      return new Promise((resolve, reject) => {
        getProjectAll()
          .then((response) => {
            this.projectList = response.result;
            console.log('this.projectList',this.projectList)
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    formTime(item) {
      let date = new Date(item.createTime);
      let Y = date.getFullYear();
      let M = date.getMonth();
      let D = date.getDate();
      let h = date.getHours();
      let m = date.getMinutes();
      let s = date.getSeconds();
      return `${Y}-${M + 1}-${D} ${h}-${m}-${s}`;
    },
    formTime2(item) {
      let date = new Date(item.updateTime);
      let Y = date.getFullYear();
      let M = date.getMonth();
      let D = date.getDate();
      let h = date.getHours();
      let m = date.getMinutes();
      let s = date.getSeconds();
      return `${Y}-${M + 1}-${D} ${h}-${m}-${s}`;
    },

    changeStatus(scope) {

      let { id, projectState } = scope.row;
      return new Promise((resolve, reject) => {
        getProjectChangeStatus({ id, projectState })
          .then((response) => {
            if (response.code === 500) {
              if (projectState === "01") {
                scope.row.projectState = "02";
              } else {
                scope.row.projectState = "01";
              }
            }
            this.getProjectList();
            resolve();
          })
          .catch((error) => {
            console.log("error2");
            if (projectState === "01") {
              scope.row.projectState = "02";
            } else {
              scope.row.projectState = "01";
            }
            reject(error);
          });
      });
    },

    handleEdit(index, row) {
      this.$router.push({
        path: "/project/edit",
        query: {
          id: row.id,
        },
      });
    },
    handleDelete(index, row) {
      this.dialogVisible = true;
      this.projectId = row.id;
      this.projectName = row.projectName;
    },
    projectDelete() {
      let data = { id: this.projectId };

      return new Promise((resolve, reject) => {
        getProjectDel(data)
          .then(() => {
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
        this.dialogVisible = false;
        this.getProjectList();
      });
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => { });
    },
    handleAdd() {
      this.$router.push({
        path: "/project/add",
      });
    },
  },
};
</script>

<style>

</style>
