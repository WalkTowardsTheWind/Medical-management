<template>
  <el-card class="box-card">
    <div slot="header">
      <span> 添加项目 </span>
    </div>
    <projectForm
      buttonText="立即添加"
      :formData="formData"
      @onSubmit="onSubmit"
    ></projectForm>
  </el-card>
</template>

<script>
import projectForm from "./projectForm.vue";
import { addProject } from "@/api/project";
export default {
  components: { projectForm },
  data() {
    return {
      formData: {},
    };
  },
  created() {},
  methods: {
    onSubmit() {
      let data = this.formData;

      return new Promise((resolve, reject) => {
        addProject(data)
          .then((response) => {
            this.formData = response.result;
            this.$router.push("/project/list");
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
