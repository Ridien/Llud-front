<template>
    <v-row justify="center">
        <v-col cols="3">
            <v-text-field label="Digita o código de permissão" v-model="permissionCode"></v-text-field>
        </v-col>
        <v-col cols="3">
            <v-btn @click="grantPermission" class="primary">Grant</v-btn>
        </v-col>
    </v-row>
</template>
  
<script>
export default {
    data() {
        return {
            permissionCode:""
        };
    },
    async mounted() {
    },
    methods: {
        async grantPermission() {
            try {
                await this.$axios.post("/admin/account/code", {
                    code:this.permissionCode
                });
                navigator.clipboard.writeText(window.location.origin+'/register?permissionCode='+this.permissionCode);
                
            } catch (error) {
                console.log(error)
            }
        },
    },
};
</script>
  
<style></style>