<template>
  <el-card class="box-card">
    <div slot="header">
      <span> 添加用户 </span>
    </div>
    <userForm
      buttonText="立即添加"
      :formData="formData"
      @onSubmit="onSubmit"
    ></userForm>
  </el-card>
</template>

<script>
import md5 from "js-md5";
import userForm from "./userForm.vue";
import { addUser } from "@/api/users";
export default {
  components: { userForm },
  data() {
    return {
      formData: {},
    };
  },
  created() {},
  methods: {
    onSubmit() {
      this.formData.password=md5(this.formData.password)
      let data = this.formData;

      return new Promise((resolve, reject) => {
        addUser(data)
          .then((response) => {
            this.formData = response.result;
            this.$router.push("/user/list");
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};
</script>

<style></style>
