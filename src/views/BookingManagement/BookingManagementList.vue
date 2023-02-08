<template>
    <el-card class="box-card">
        <div slot="header">
            <span>预约管理</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text" @click="handleAdd()">添加</el-button> -->
        </div>
        <el-table :stripe="true" :border="true" :data="patientList" style="width: 100%;margin-top: 60px">
            <el-table-column :formatter="formTime" sortable prop="timeOfAppointment" label="预约时间" width="180px"
                align="center">
            </el-table-column>
            <el-table-column prop="patientName" label="患者姓名" width="180" align="center">
            </el-table-column>
            <el-table-column prop="Department" label="科室" width="180" align="center">
            </el-table-column>
            <el-table-column prop="doctorName" label="医生" width="180" align="center">
            </el-table-column>
            <el-table-column prop="bed" label="预约床位" width="180" align="center">
            </el-table-column>
            <el-table-column label="操作" min-width="200" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">预约</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>

                    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
                        <span>确定删除{{ patientName }}预约</span>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogVisible = false">取 消</el-button>
                            <el-button type="primary" @click="BookingManagementDelete(scope.row)">确 定</el-button>
                        </span>
                    </el-dialog>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script>
import { getPatientList, getPatientEdit } from "@/api/patient";
export default {
    data() {
        return {
            patientList: [],
            dialogVisible: false,
            patientId: "",
            patientName: "",
            Datas:''
        };
    },
    created() {
        this.getPatientList();
    },
    methods: {
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
            if (item.timeOfAppointment == '') return
            let date = new Date(item.timeOfAppointment);
            let Y = date.getFullYear();
            let M = date.getMonth();
            let D = date.getDate();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();

            return `${Y}-${M + 1}-${D} ${h}:${m}:${s}`;
        },
        handleEdit(index, row) {
            this.$router.push({
                path: "/BookingManagement/edit",
                query: {
                    id: row.id,
                },
            });
        },
        handleDelete(index, row) {

            this.dialogVisible = true;
            this.Datas=row;
            this.patientId = row.id;
            this.patientName = row.patientName;
        },
        BookingManagementDelete() {
            this.Datas.timeOfAppointment="";
            this.Datas.Department="";
            this.Datas.doctorName="";
            this.Datas.bed="";
            let data = { ...this.Datas }
            return new Promise((resolve, reject) => {
                getPatientEdit(data)
                    .then(() => {
                        this.$router.push('/BookingManagement/list')
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
                .then(() => {
                    done();
                })
                .catch(() => { });
        },
        handleAdd() {
            // this.$router.push({
            //     path: "/BookingManagement/add",
            // });
        },
    },
};
</script>

<style>

</style>
