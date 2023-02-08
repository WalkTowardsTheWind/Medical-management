<template>
  <el-card class="box-card">
    <div slot="header">
      <span> 编辑项目 </span>
    </div>
    <projectForm
      buttonText="立即更新"
      :formData="formData"
      @onSubmit="onSubmit"
    ></projectForm>
  </el-card>
</template>

<script>
import projectForm from "./projectForm.vue";
import { getProjectDetail, getProjectEdit } from "@/api/project";
export default {
  components: { projectForm },
  data() {
    return {
      formData: {},
    };
  },
  created() {
    this.getType();
  },
  methods: {
    getType() {
      let data = { id: this.$route.query.id };

      return new Promise((resolve, reject) => {
        getProjectDetail(data)
          .then((response) => {
            this.formData = response.result;
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    onSubmit() {
      let data = { id: this.$route.query.id, ...this.formData };

      return new Promise((resolve, reject) => {
        getProjectEdit(data)
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
