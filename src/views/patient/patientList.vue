<template>

  <el-card class="box-card">
    <div slot="header">
      <span>患者管理</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="handleAdd()">添加</el-button>
    </div>
    <el-button-group class="card-toggle-table" style="float: right;">
      <el-tooltip v-if="cardType" class="item" effect="dark" content="切换成表格" placement="top-start">
        <el-button size="mini" plain icon="el-icon-s-grid" @click="toggle" />
      </el-tooltip>
      <el-tooltip v-else class="item" effect="dark" content="切换成卡片" placement="top-start">
        <el-button size="mini" plain icon="el-icon-bank-card" @click="toggle" />
      </el-tooltip>
    </el-button-group>

    <!-- 卡片风格 -->
    <el-row v-if="cardType" style="margin-top: 60px;">
      <el-col v-for="item in patientList" :key="item.id" :span="5" style="margin-bottom:5px;" :offset="1">
        <el-card style="min-width:280px">
          <div slot="header" class="clearfix">
            <i class="el-icon-user" /><span style="margin-left:10px">{{
              item.patientName
            }}</span>
            <div style="display: inline-block; float: right; cursor:pointer" @click="doEdit(item.id)">
              <el-tooltip effect="dark" content="编辑患者" placement="top">
                <i class="el-icon-edit-outline" style="margin-left:1px" />
              </el-tooltip>
            </div>
          </div>
          <div>
            <ul class="role-info" style="padding-inline-start: 10px;">

              <li>
                <div class="role-left" style="margin-top:5px">治疗号：{{ item.TreatmentNo }}</div>
              </li>
              <li>
                <div class="role-left" style="margin-top:5px">患者年龄：{{ item.patientAge }}</div>
              </li>
              <li>
                <div class="role-left" style="margin-top:5px">治疗次数：{{ item.NumberOfTreatments }}</div>
              </li>
              <li>
                <div class="role-left" style="margin-top:5px">传染性指标：{{ item.InfectiousIndex }}</div>
              </li>
              <li>
                <div class="role-left" style="margin-top:5px">诊断：{{ item.diagnosis }}</div>
              </li>
              <li>
                <div class="role-left" style="margin-top:5px"> 创建时间：{{ formTime(item) }} </div>
              </li>
            </ul>
          </div>
          <div style="display: inline-block; float: left; cursor:pointer">
            <el-tooltip effect="dark" content="打印诊断单" placement="bottom">
              <i class="el-icon-printer" />
            </el-tooltip>
          </div>
          <div style="display: inline-block; float: right; cursor:pointer" @click="handleDelete(item, item)">





            <el-tooltip effect="dark" content="删除患者" placement="bottom">
              <i class="el-icon-delete" style="margin-left:" />
            </el-tooltip>
          </div>
          <!-- 对话框 -->
          <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <span>确定删除{{ patientName }}</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="patientDelete()">确 定</el-button>
            </span>
          </el-dialog>
        </el-card>
      </el-col>
    </el-row>


    <!-- 表格风格 -->

    <el-table v-else :stripe="true" :border="true" :data="patientList" style="width: 100%;margin-top: 60px">
      <el-table-column :formatter="formTime" prop="createTime" label="日期" width="180px" align="center">
      </el-table-column>
      <el-table-column prop="patientName" label="患者姓名" width="180" align="center">
      </el-table-column>
      <el-table-column prop="diagnosis" label="诊断" width="180" align="center">
      </el-table-column>
      <el-table-column prop="NumberOfTreatments" label="治疗次数" width="180" align="center">
      </el-table-column>
      <el-table-column prop="TreatmentNo" label="治疗号" width="180" align="center">
      </el-table-column>
      <el-table-column :formatter="formAge" prop="patientAge" label="年龄" align="center">
      </el-table-column>
      <el-table-column label="操作" min-width="200" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>

          <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <span>确定删除{{ patientName }}</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="patientDelete(scope.row)">确 定</el-button>
            </span>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { getPatientList, getPatientDel } from "@/api/patient";
export default {
  data() {
    return {
      patientList: [],
      dialogVisible: false,
      patientId: "",
      patientName: "",
      // 默认为卡片风格，为false时切换成列表风格
      cardType: true,
    };
  },
  created() {
    this.getPatientList();
  },
  methods: {
    // 点击切换风格
    toggle() {
      this.cardType = !this.cardType
    },



    getPatientList() {
      return new Promise((resolve, reject) => {
        getPatientList()
          .then((response) => {
            this.patientList = response.result;

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
    formAge(item) {
      return `${item.patientAge}岁`

    },
    doEdit(id) {
      this.$router.push({
        path: "/patient/edit",
        query: {
          id: id,
        },
      });

    },
    handleEdit(index, row) {
      this.$router.push({
        path: "/patient/edit",
        query: {
          id: row.id,
        },
      });
    },
    handleDelete(index, row) {

      this.dialogVisible = true;
      this.patientId = row.id;
      this.patientName = row.patientName;
    },
    patientDelete() {

      let data = { id: this.patientId }
      return new Promise((resolve, reject) => {
        getPatientDel(data)
          .then((response) => {
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
        this.dialogVisible = false;
        this.getPatientList();
      });
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => { });
    },
    handleAdd() {
      this.$router.push({
        path: "/patient/add",
      });
    },
  },
};
</script>

<style>

</style>