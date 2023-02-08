<template>
    <el-card class="box-card">
        <div slot="header">
            <span>
                预约时间
            </span>
        </div>
        <BookingManagementForm buttonText="立即更新" :formData="formData" @onSubmit="onSubmit"></BookingManagementForm>

    </el-card>

</template>

<script>
import BookingManagementForm from './BookingManagementForm.vue'
import { getPatientDetail, getPatientEdit } from '@/api/patient'
export default {
    components: { BookingManagementForm },
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
            let data = { id: this.$route.query.id, ...this.formData };

            return new Promise((resolve, reject) => {

                getPatientEdit(data).then(()=> {
                    this.$router.push('/BookingManagement/list')
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