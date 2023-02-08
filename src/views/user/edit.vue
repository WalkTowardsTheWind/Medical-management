<template>
  <el-card class="box-card">
    <div slot="header">
      <span>
        编辑用户
      </span>
    </div>
    <userForm buttonText="立即更新" :formData="formData" @onSubmit="onSubmit"></userForm>

  </el-card>

</template>

<script>
import md5 from "js-md5";
import userForm from './userForm.vue'
import { getDetail,getEdit } from '@/api/users'
export default {
  components: { userForm },
  data() {
    return {
      formData: {},
    }
  },
  created() {
    this.getUser();

  },
  methods: {
    getUser() {
      let data = { id: this.$route.query.id };
      

      return new Promise((resolve, reject) => {

        getDetail(data).then(response => {
          delete response.result.username
          delete response.result.password
          console.log('123',response.result)

          this.formData = response.result;
          resolve()
        }).catch(error => {
          reject(error)
        })

      })

    },
    onSubmit() {
      // this.formData.password=md5(this.formData.password)
      
      let data = { id: this.$route.query.id,...this.formData};
      
      return new Promise((resolve, reject) => {

        getEdit(data).then(response => {
          

          this.formData = response.result;
          this.$router.push('/user/list')
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