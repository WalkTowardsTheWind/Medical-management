<template>
  <el-form label-position="right" label-width="80px" :model="formData">
    <!-- <el-form-item label="账号名">
      <el-input v-model="formData.username" style="width: 50%"></el-input>
    </el-form-item>
    <el-form-item label="账号密码">
      <el-input v-model="formData.password" style="width: 50%"></el-input>
    </el-form-item> -->



    
    <el-form-item label="工号">
      <el-input v-model="formData.JobNo" style="width: 50%"></el-input>
    </el-form-item>
    <el-form-item label="姓名">
      <el-input v-model="formData.realname" style="width: 50%"></el-input>
    </el-form-item>
    <el-form-item label="性别">
      <el-select v-model="formData.Gender" style="width: 50%" placeholder="请选择性别">
        <el-option label="男" value="男"></el-option>
        <el-option label="女" value="女"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="职位">
      <el-input v-model="formData.positionalTitles" style="width: 50%"></el-input>
    </el-form-item>
    <!-- <el-form-item label="医院/科室/分类">
      <el-input v-model="formData." style="width: 50%"></el-input>
    </el-form-item> -->
    <el-form-item label="角色名称">
      <el-select v-model="formData.role" style="width: 50%" placeholder="请选择角色">
        <el-option label="治疗师、管理员" value="1"></el-option>
        <el-option label="治疗师" value="2"></el-option>
      </el-select>
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
  name: "userForm",
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
