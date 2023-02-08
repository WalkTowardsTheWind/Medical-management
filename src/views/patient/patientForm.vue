<template>
  <el-form label-position="right" label-width="100px" :model="formData">
    <el-form-item label="患者姓名">
      <el-input v-model="formData.patientName" style="width: 50%"></el-input>
    </el-form-item>
    <el-form-item label="患者年龄">
      <el-input v-model="formData.patientAge" style="width: 50%"></el-input>
    </el-form-item>
    <el-form-item label="治疗号">
      <el-input v-model="formData.TreatmentNo" style="width: 50%"></el-input>
    </el-form-item>
    <el-form-item label="治疗次数">
      <el-input v-model="formData.NumberOfTreatments" style="width: 50%"></el-input>
    </el-form-item>
    <el-form-item label="传染性指标">
      <el-input v-model="formData.InfectiousIndex" style="width: 50%"></el-input>
    </el-form-item>
    <el-form-item label="诊断">
      <el-input v-model="formData.diagnosis" style="width: 50%"></el-input>
    </el-form-item>
    <!-- <el-form-item label="预约时间">
    <el-date-picker
      v-model="formData.timeOfAppointment"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>
      <el-input disabled v-model="formData.timeOfAppointment" style="width: 50%"></el-input>
    </el-form-item> -->
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

<style></style>
