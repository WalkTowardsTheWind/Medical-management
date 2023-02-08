<template>
    <el-form label-position="right" label-width="100px" :model="formData">
        <el-form-item label="预约时间">
            <el-date-picker v-model="formData.timeOfAppointment" type="datetime" placeholder="选择日期时间">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="患者姓名">
            <el-input v-model="formData.patientName" style="width: 50%"></el-input>
        </el-form-item>
        <el-form-item label="科室">
            <el-input v-model="formData.Department" style="width: 50%"></el-input>
        </el-form-item>
        <el-form-item label="医生">
            <el-input v-model="formData.doctorName" style="width: 50%"></el-input>
        </el-form-item>
        <el-form-item label="预约床位">
            <el-input v-model="formData.bed" style="width: 50%"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm()">{{
                buttonText
            }}</el-button>
            <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    name: "patientForm",
    props: ["buttonText", "formData"],
    data() {
        return {};
    },
    methods: {
        submitForm() {
            this.$emit("onSubmit");
        },
        resetForm() {
            console.log("error submit!!");
        },
    },
};
</script>

<style>

</style>
