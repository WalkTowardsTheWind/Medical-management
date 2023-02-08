<template>
  <el-card class="box-card">
    <div slot="header">
      <span>人员管理</span>
      <el-button style="float:right;padding:3px 0" type="text" @click="handleAdd()">添加</el-button>
    </div>
    <el-button-group class="card-toggle-table" style="float: right">
      <el-tooltip v-if="cardType" class="item" effect="dark" content="切换成表格" placement="top-start">
        <el-button size="mini" plain icon="el-icon-s-grid" @click="toggle" />
      </el-tooltip>
      <el-tooltip v-else class="item" effect="dark" content="切换成卡片" placement="top-start">
        <el-button size="mini" plain icon="el-icon-bank-card" @click="toggle" />
      </el-tooltip>
    </el-button-group>

    <el-row v-if="cardType" style="margin-top: 60px">
      <el-col v-for="item in userList" :key="item.id" :span="5" style="margin-bottom: 5px" :offset="1">
        <el-card style="min-width: 280px">
          <div slot="header" class="clearfix">
            <i class="el-icon-user" /><span style="margin-left: 5px">{{
              item.realname
            }}</span>
            <div style="display: inline-block; float: right; cursor: pointer" @click="handleEdit(item, item)">
              <el-tooltip effect="dark" content="编辑角色" placement="top">
                <i class="el-icon-edit-outline" style="margin-left: 1px" />
              </el-tooltip>
            </div>
          </div>
          <div>
            <ul class="role-info" style="padding-inline-start: 10px">
              <li>
                <div class="role-left" style="margin-top: 5px">
                  工号：{{ item.JobNo }}
                </div>
              </li>
              <!-- <li>
                <div class="role-left" style="margin-top:5px">姓名：{{ item.realname }}</div>
              </li> -->
              <li>
                <div class="role-left" style="margin-top: 5px">
                  性别：{{ item.Gender }}
                </div>
              </li>
              <li>
                <div class="role-left" style="margin-top: 5px">
                  职位：{{ item.positionalTitles }}
                </div>
              </li>
              <li>
                <div class="role-left" style="margin-top: 5px">
                  角色：{{ formRole(item) }}
                </div>
              </li>
              <li>
                <div class="role-left" style="margin-top: 5px">
                  创建时间：{{ formTime(item) }}
                </div>
              </li>
            </ul>
          </div>

          <!--  -->
          <div style="display: inline-block; float: left; cursor: pointer" @click="handleRole(item)">
            <el-tooltip effect="dark" content="权限分配" placement="bottom">
              <i class="el-icon-printer" />
            </el-tooltip>
          </div>
          <!--  -->

          <div style="display: inline-block; float: right; cursor: pointer" @click="handleDelete(item, item)">
            <el-tooltip effect="dark" content="删除角色" placement="bottom">
              <i class="el-icon-delete" style="margin-left: " />
            </el-tooltip>
          </div>

          <!-- 删除对话框 -->
          <el-dialog title="提示" :visible.sync="deleteDialogVisible" width="30%" :before-close="handleClose">
            <span>确定删除{{ username }}</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="deleteDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="userDelete()">确 定</el-button>
            </span>
          </el-dialog>

          <!-- 权限分配对话框 -->
          <el-dialog title="权限分配" :center="true" :visible.sync="permissionAssignmentDialogVisible" width="30%"
            :before-close="handleClose">
            <span>将&nbsp;&nbsp;"&nbsp;{{
              user.realname
            }}&nbsp;"&nbsp;&nbsp;设置为&nbsp;&nbsp;</span>
            <el-select v-model="user.role" placeholder="请选择">
              <el-option label="治疗师、管理员" value="1"> </el-option>
              <el-option label="治疗师" value="2"> </el-option>
            </el-select>
            <span slot="footer" class="dialog-footer">
              <el-button @click="permissionAssignmentDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="changeRole2()">确 定</el-button>
            </span>
          </el-dialog>
        </el-card>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table v-else :stripe="true" :border="true" :data="userList" style="width: 100%; margin-top: 60px">
      <el-table-column :formatter="formTime" prop="createTime" label="日期" width="180px" align="center">
      </el-table-column>
      <el-table-column prop="JobNo" label="工号" width="180" align="center">
      </el-table-column>
      <el-table-column prop="realname" label="姓名" width="180" align="center">
      </el-table-column>
      <el-table-column prop="Gender" label="性别" width="180" align="center">
      </el-table-column>
      <el-table-column prop="positionalTitles" label="职位" width="180" align="center">
      </el-table-column>
      <!-- <el-table-column prop="" label="医院/科室/分类" width="180" align="center">
      </el-table-column> -->
      <el-table-column prop="role" label="角色名称" width="180" align="center">
        <template slot-scope="scope">
          <el-select @change="changeRole(scope)" v-model="scope.row.role" placeholder="请选择">
            <el-option label="治疗师、管理员" value="1"> </el-option>
            <el-option label="治疗师" value="2"> </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="200" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>

          <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <span>确定删除{{ username }}</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="userDelete(scope.row)">确 定</el-button>
            </span>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { getList, getDel, getEdit } from "@/api/users";
export default {
  data() {
    return {
      userList: [],
      deleteDialogVisible: false,
      permissionAssignmentDialogVisible: false,
      userId: "",
      username: "",
      //权限分配
      user: {},
      // 默认为卡片风格，为false时切换成列表风格
      cardType: true,
      //分配权限弹出框
      visible: false,
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    // 点击切换风格
    toggle() {
      this.cardType = !this.cardType;
    },

    getUserList() {
      return new Promise((resolve, reject) => {
        getList()
          .then((response) => {
            this.userList = response.result;
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
    formRole(item) {
      if (item.role == 1) {
        return "治疗师、管理员";
      } else if (item.role == 2) {
        return "治疗师";
      }
    },
    changeRole(scope) {
      let { role } = scope.row;

      return new Promise((resolve, reject) => {
        getEdit(scope.row)
          .then((response) => {
            if (response.code === 500) {
              if (role === "1") {
                scope.row.role = "2";
              } else {
                scope.row.role = "1";
              }
            }
            resolve();
          })
          .catch((error) => {
            console.log("error2");
            if (role === "1") {
              scope.row.role = "2";
            } else {
              scope.row.role = "1";
            }
            reject(error);
          });
      });
    },
    handleRole(row) {
      this.permissionAssignmentDialogVisible = true;
      this.user = JSON.parse(JSON.stringify(row));
    },
    changeRole2() {
      let data = this.user;

      return new Promise((resolve, reject) => {
        getEdit(data)
          .then(() => {

            resolve();
          })
          .catch((error) => {
            reject(error);
          });
        this.permissionAssignmentDialogVisible = false;
        this.user = {};
        this.getUserList();
      });
    },

    handleEdit(index, row) {
      this.$router.push({
        path: "/user/edit",
        query: {
          id: row.id,
        },
      });
    },

    handleDelete(index, row) {
      this.deleteDialogVisible = true;
      this.userId = row.id;
      this.username = row.username;
    },
    userDelete() {
      let data = { id: this.userId };
      return new Promise((resolve, reject) => {
        getDel(data)
          .then(() => {

            resolve();
          })
          .catch((error) => {
            reject(error);
          });
        this.deleteDialogVisible = false;
        this.userId = "";
        this.getUserList();
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
        path: "/user/add",
      });
    },
  },
};
</script>

<style>

</style>
