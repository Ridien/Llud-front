<template>
    <div>
        <v-app-bar color="white">
            <v-row no-gutters align="center">
                <v-col cols="4">
                    <v-row no-gutters>
                        <v-img src="\img\logo.svg" max-height="48px" max-width="48px" contain></v-img>
                        <h1 v-if="$vuetify.breakpoint.mdAndUp" class="primary--text ma-0 pa-0 mx-2 pt-2">Llud</h1>
                    </v-row>
                </v-col>
                <v-col cols="4"></v-col>
                <v-col cols="4">
                    <v-row justify="end" class="px-5">
                        <a @click="$router.push('/')" class="text-h5">Sair</a>
                    </v-row>
                </v-col>
            </v-row>
        </v-app-bar>
        <v-app class="teaGreen">
            <v-container fluid>
                <v-row no-gutters justify="center">
                    <v-col cols="11" md="9" class="white elevation-5 pa-4">
                        <v-row no-gutters align="center">
                            <v-btn @click="$router.push({
                                name: 'user'
                            })" text>
                                <v-icon class="primary--text">mdi-arrow-left</v-icon>
                                <p class="primary--text ma-0 pa-0">Voltar para a lista</p>
                            </v-btn>
                        </v-row>
                        <v-row no-gutters justify="center" class="teaGreenTransparent elevation-4">
                            <v-col v-if="cover && cover.scaled" cols="10">
                                <v-img contain max-height="500" v-if="!!imgList[cover.scaled.slice(-1)[0].url]" :src="imgList[cover.scaled.slice(-1)[0].url]">
                                </v-img>
                                 <div style="display:none">
                                    {{
                                        getImgByUrl(cover.scaled.slice(-1)[0].url)
                                    }} 
                                </div>
                            </v-col>
                        </v-row>
                        <v-row no-gutters justify="start">
                            <v-col cols="10">
                                <h1 class="primary--text">
                                    {{ name }}
                                </h1>
                                <div v-if="Object.keys(cardObject).length > 0" class="black--text"
                                    style="white-space: pre-line">
                                    <div v-for="item in Object.keys(cardObject)" :key="item">
                                        <v-row no-gutters>
                                            <v-col cols="12">
                                                <h3 class="font-weight-bold ma-0 pa-0">
                                                    {{ item }}
                                                </h3>

                                                <p class="ma-0 pa-0">{{ cardObject[item] }}</p>
                                            </v-col>

                                        </v-row>

                                    </div>
                                </div>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>

            </v-container>
        </v-app>
    </div>
</template>
    
<script>
export default {
    data() {
        return {
            cardObject: {},
            name: "",
            cover: null,
            imgList: {},
            loadUrl: []
        };
    },
    async mounted() {
        try {
            const { data } = await this.$axios.get(
                "/user/card/" +
                this.$route.params.cardId
            );
            this.name = data.name;
            this.cardObject = data.card_object;
            if (data.cover) {
                this.cover = data.cover;
            }
        } catch (error) {
            console.log(error)
        }
    },
    methods: {
        async getImgByUrl(url) {
            if(!url || this.loadUrl.includes(url)){
                return
            }
            this.loadUrl.push(url)
            let data = await this.$axios.get('user/img', {
                params: {
                    img_url: url
                }
            })
            this.$set(this.imgList, url, data.data)
            return true
        },
    }
};
</script>
    
<style scoped>
.teaGreenTransparent {
    background-color: #2B3E5099;
}

::v-deep header {
    z-index: 999 !important;
}
</style>