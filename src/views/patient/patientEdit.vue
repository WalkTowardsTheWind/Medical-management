<template>
  <el-card class="box-card">
    <div slot="header">
      <span>
        编辑患者
      </span>
    </div>
    <patientForm buttonText="立即更新" :formData="formData" @onSubmit="onSubmit"></patientForm>

  </el-card>

</template>

<script>
import patientForm from './patientForm.vue'
import { getPatientDetail,getPatientEdit } from '@/api/patient'
export default {
  components: { patientForm },
  data() {
    return {
      formData: {},
   
    }
  },
  created() {
    this.getPatient();

  },
  methods: {
    getPatient() {
      let data = { id: this.$route.query.id };
      

      return new Promise((resolve, reject) => {

        getPatientDetail(data).then(response => {
          this.formData = response.result;
          resolve()
        }).catch(error => {
          reject(error)
        })

      })

    },
    onSubmit() {
      let data = { id: this.$route.query.id,...this.formData};
      
      return new Promise((resolve, reject) => {

        getPatientEdit(data).then(response => {
  
          this.formData = response.result;
          this.$router.push('/patient/list')
          resolve()
        }).catch(error => {
          reject(error)
        })

      })
    }
  }

}
</script>

<style>

</style>