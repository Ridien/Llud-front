<template>
    <v-row justify="center">
        <v-col cols="3">
            <v-select label="Selecione o usuário" v-model="userSelected" :items="userList"
                item-text="nickname" item-value="id"></v-select>
        </v-col>
        <v-col cols="3">
            <v-select label="Selecione o quadro" v-model="boardSelected" :items="boardsList"
                item-text="boardName" item-value="id"></v-select>
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
            cardUrl: "",
            boardsList: [],
            userList: [],
            userSelected:"",
            boardSelected:"",
        };
    },
    async mounted() {
        const { data } = await this.$axios.get("/admin/board/all");
        const { data: userData } = await this.$axios.get("/admin/user/get-all");
        this.boardsList = data;
        this.userList = userData
    },
    methods: {
        async grantPermission() {
            try {
                await this.$axios.post("/admin/permission/board/grant", {
                    userId: this.userSelected,
                    boardId: this.boardSelected
                });
            } catch (error) {
                console.log(error)
            }
        },
    },
};
</script>
  
<style></style>