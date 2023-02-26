<script>
export default {
    data() {
        return {
            boardName:"",
            boardUrl:""
        }
    },
    methods:{
        createBoard(){
            this.$axios.post('/admin/board/create', {
                boardName:this.boardName,
                boardUrl:this.boardUrl
            })
        }
    }
}
</script>

<template>
    <v-row justify="center">
        <v-text-field v-model="boardName" label="Insira o nome do board"></v-text-field>
        <v-text-field v-model="boardUrl" label="Insira a url do board"></v-text-field>
        <v-btn @click="createBoard()">Criar</v-btn>
    </v-row>
</template>

<style scoped></style>
