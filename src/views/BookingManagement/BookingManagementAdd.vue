<template>
    <el-card class="box-card">
        <div slot="header">
            <span>预约时间</span>
        </div>
        <BookingManagementForm buttonText="立即预约" :formData="formData" @onSubmit="onSubmit"></BookingManagementForm>
    </el-card>
</template>

<script>

import BookingManagementForm from './BookingManagementForm.vue'
import { getPatientEdit } from '@/api/patient'
export default {
    components: { BookingManagementForm },
    data() {
        return {
            formData: {},
        };
    },
    created() { },
    methods: {
        onSubmit() {
            let data = this.formData;

            return new Promise((resolve, reject) => {
                getPatientEdit(data)
                    .then((response) => {
                        this.formData = response.result;
                        this.$router.push("/BookingManagement/list");
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

<style>

</style>
