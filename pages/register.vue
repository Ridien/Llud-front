<template>
    <div>
        <v-app>
            <v-row no-gutters class="background-class menu px-5 py-3" align="center">
                <v-img src="\img\logo.svg" max-height="64px" max-width="64px" contain></v-img>
                <h1 class="primary--text ma-0 pa-0 mx-2 pt-3">Llud</h1>
            </v-row>
            <v-row no-gutters>
                <v-img max-height="91vh" src="\img\background.svg" class="ma-0 pa-0" fluid>
                    <v-row class="main-container" no-gutters justify="center" align="center">
                        <v-col cols="12" md="4">
                            <v-card class="smokeGray ma-12 mt-n6 rounded-lg">
                                <v-row no-gutters justify="center" class="py-4 px-0">
                                    <v-col cols="11">
                                        <h2 class="font-weight-bold text-h4 mb-5 mt-3 primary--text">Vamos cadastrar o seu usuário</h2>
                                        <p class="primary--text">Nome de Usuário</p>
                                        <v-text-field outlined v-model="username"></v-text-field>
                                        <p class="primary--text">Senha</p>
                                        <v-text-field :error-messages="passwordError" outlined v-model="password" type="password"></v-text-field>
                                        <p class="primary--text">Repita sua Senha</p>
                                        <v-text-field outlined v-model="passwordConfirm" type="password"></v-text-field>
                                        <v-btn class="primary py-5" :disabled="passwordError || !formOk" block @click="createAccount">
                                            <p class="pa-0 ma-0">
                                                Cadastrar
                                            </p>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-img>
            </v-row>
        </v-app>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: '',
            passwordConfirm: '',
            code:''
        }
    },
    methods: {
        async createAccount() {
            try {
                const { data } = await this.$axios.post('/visitor/account/create', {
                    code:this.code,
                    username: this.username,
                    password: this.password
                })
                this.$prettyAlerts.info('Cadastro efetuado com sucesso! Por favor faça o login.')
                this.$router.push('/')
            } catch (error) {
                if(error.response && error.response.data){
                    this.$prettyAlerts.error(error.response.data.message)
                }
            }
        }
    },
    computed:{
        passwordError(){
            if(!!this.passwordConfirm && this.passwordConfirm !== this.password){
                return "As senhas precisam ser iguais"
            }
            return null
        },
        formOk(){
            return !!this.username && !!this.password && this.passwordConfirm
        }
    },  
    mounted(){
        if(!this.$route.query.permissionCode){
            this.$router.push("/")
        }
        this.code = this.$route.query.permissionCode
    }
}
</script>

<style scoped>
.main-container {
    height: 91% !important;
}

.background-class {
    background-color: #c3d6b4;
}

.menu {
    height: 9%;
}
</style>