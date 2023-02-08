<template>
  <el-form label-position="right" label-width="80px" :model="formData">
    <el-form-item label="项目名称">
      <el-input v-model="formData.projectName" style="width: 50%"></el-input>
    </el-form-item>
    <el-form-item label="项目代码">
      <el-input v-model="formData.projectCode" style="width: 50%"></el-input>
    </el-form-item>
    <el-form-item label="项目状态">
      
          <el-select
            style="width: 50%"
            v-model="formData.projectState"
            placeholder="请选择"
          >
            <el-option label="待完成" value="01"> </el-option>
            <el-option label="已完成" value="02"> </el-option>
          </el-select>
        
      <!-- <el-input v-model="formData.projectState" style="width: 50%"></el-input> -->
    </el-form-item>
    <el-form-item label="科室">
      <el-input v-model="formData.Department" style="width: 50%"></el-input>
    </el-form-item>
    <el-form-item label="医生">
      <el-input v-model="formData.doctorName" style="width: 50%"></el-input>
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
  name: "projectForm",
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
