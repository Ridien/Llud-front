<template>
    <div>
        <v-app>
            <v-row no-gutters>
                <v-img height="100vh" src="\img\background2.svg" class="ma-0 pa-0">
                    <v-row no-gutters class="menu px-5 py-3" align="center">
                        <v-img src="\img\logo.svg" max-height="64px" max-width="64px" contain></v-img>
                        <h1 class="primary--text ma-0 pa-0 mx-2 pt-3">Llud</h1>
                    </v-row>
                    <v-row class="main-container" no-gutters justify="center" align="center">
                        <v-col cols="12" md="4">
                            <v-card class="smokeGray ma-12 mt-n6 rounded-lg">
                                <v-row no-gutters justify="center" class="py-4 px-0">
                                    <v-col cols="11">
                                        <h2 class="font-weight-bold text-h5 mb-5 primary--text">Por favor, faça o login</h2>
                                        <p class="primary--text">Nome de Usuário</p>
                                        <v-text-field outlined v-model="username"></v-text-field>
                                        <p class="primary--text">Senha</p>
                                        <v-text-field outlined v-model="password" type="password"></v-text-field>
                                        <v-btn class="primary py-5" block @click="doLogin">
                                            <p class="pa-0 ma-0">
                                                Login
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
            password: ''
        }
    },
    methods: {
        async doLogin() {
            try {
                const { data } = await this.$axios.post('visitor/login', {
                    username: this.username,
                    password: this.password
                })
                await this.$store.dispatch('authenticateUser', { token: data.token })
                if (data.isAdmin) {
                    return this.$router.push({
                        name: 'admin'
                    })
                }
                return this.$router.push({
                    name: 'user'
                })
            } catch (error) {
                console.log(error)
            }
        }
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