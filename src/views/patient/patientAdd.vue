<template>
  <el-card class="box-card">
    <div slot="header">
      <span>添加患者</span>
    </div>
    <patientForm
      buttonText="立即添加"
      :formData="formData"
      @onSubmit="onSubmit"
    ></patientForm>
  </el-card>
</template>

<script>

import patientForm from './patientForm.vue'
import { addPatient } from '@/api/patient'
export default {
  components: { patientForm },
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
        addPatient(data)
          .then((response) => {
            this.formData = response.result;
            this.$router.push("/patient/list");
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
