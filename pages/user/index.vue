<template>
    <div class="teaGreen main-container">
        <v-app-bar :style="'width:100%'" color="white">
            <v-row no-gutters align="center">
                <v-col cols="2" md="4">
                    <v-row no-gutters>
                        <v-img src="\img\logo.svg" max-height="48px" max-width="48px" contain></v-img>
                        <h1 v-if="$vuetify.breakpoint.mdAndUp" class="primary--text ma-0 pa-0 mx-2 pt-2">Llud</h1>
                    </v-row>
                </v-col>
                <v-col cols="8" md="4">
                    <v-text-field v-model="nameFilter" append-icon="search" class="rounded-pill" hide-details outlined dense
                        label="Pesquisar"></v-text-field>
                </v-col>
                <v-col cols="2" md="4">
                    <v-row justify="end" class="px-5">
                        <a class="text-h5" @click="$router.push('/')">Sair</a>
                    </v-row>
                </v-col>
            </v-row>
        </v-app-bar>
        <v-main :style="{
            'width':$vuetify.breakpoint.mdAndUp?'100%':'93%'
        }">
            <v-container class="ma-0 pa-0" fluid fill-height>
                <v-row no-gutters class="ma-0 pa-0">
                    <v-col cols="auto">
                        <v-navigation-drawer permanent absolute v-if="isLoaded" clipped v-model="drawer" :mini-variant.sync="mini">
                            <v-list-item class="px-4">
                                <v-row v-if="mini" justify="center" align="center">
                                    <v-icon class="primary--text">mdi-menu</v-icon>


                                </v-row>
                                <v-row v-else justify="end">
                                    <v-btn v-if="!mini" icon @click.stop="mini = !mini">
                                        <v-icon>mdi-chevron-left</v-icon>
                                    </v-btn>
                                </v-row>
                            </v-list-item>
                            <v-divider></v-divider>

                            <v-list dense>

                                <v-list-item-group v-model="selectedBoard" mandatory color="primary">
                                    <v-list-item :value="item.id" v-for="item, idx in userBoards" :key="idx" link>
                                        <v-list-item-icon>
                                            <v-icon>mdi-castle</v-icon>
                                        </v-list-item-icon>

                                        <v-list-item-content>
                                            <v-list-item-title>{{ item.boardName }}</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list-item-group>

                            </v-list>
                        </v-navigation-drawer>
                    </v-col>
                    <v-col>
                        <v-app>
                            <v-row no-gutters class="ma-0 pa-0 teaGreen">
                                <v-col class="pl-2 pl-md-0">
                                    <v-row no-gutters justify="center" class="my-md-6 sheet-y pl-12 pl-md-0">
                                        <v-col :class="{
                                            'teaGreen':!$vuetify.breakpoint.mdAndUp,
                                            'white':$vuetify.breakpoint.mdAndUp
                                        }" class=" elevation-3 d-flex flex-column" cols="12" md="9">
                                            <v-row no-gutters class="mt-4 mx-4 nogrow">
                                                <h2 class="text-h5 font-weight-bold my-0 py-0 primary--text nogrow">
                                                    Artigos
                                                </h2>
                                            </v-row>
                                            <v-row no-gutters class="px-4 nogrow">
                                                <v-divider></v-divider>
                                            </v-row>
                                            <v-row no-gutters class="stretch nogrow">
                                                <v-col class="d-flex pa-6" cols="12" md="3" xl="2" v-for="card in getPageItems"
                                                    :key="card.id">
                                                    <v-card class="pa-3 pb-8 elevation-5">
                                                        <v-row no-gutters justify='center' class="py-2">
                                                            <v-img height="160px" v-if="!!imgList[card.cover]" contain class="pa-5"
                                                                :src="imgList[card.cover]"></v-img>
                                                            <v-img height="160px" v-if="!imgList[card.cover]" contain class="pa-5"
                                                                :src="'/img/default.png'"></v-img>
                                                            <div style="display:none">
                                                                {{
                                                                    getImgByUrl(card.cover)
                                                                }} 
                                                            </div>
                                                        </v-row>
                                                        <v-row no-gutters>
                                                            <p class="px-2 primary--text font-weight-bold body-2">{{
                                                                card.name }}</p>
                                                        </v-row>
                                                        <v-row class='view-btn' justify="end" align="end" no-gutters>
                                                            <v-btn @click="$router.push({
                                                                name: 'user-cardId',
                                                                params: {
                                                                    cardId: card.id
                                                                }
                                                            })" class="secondary white--text">Visualizar</v-btn>
                                                        </v-row>
                                                    </v-card>
                                                </v-col>
                                            </v-row>
                                            <v-row class="pagination" no-gutters justify="center" align="end">
                                                <v-pagination v-model="page" :length="totalPages" :total-visible="7"
                                                    circle></v-pagination>
                                            </v-row>
                                        </v-col>

                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-app>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>


    </div>
</template>

<script>
export default {
    data() {
        return {
            drawer: true,
            items: [
                { title: 'Home', icon: 'mdi-home-city' },
                { title: 'My Account', icon: 'mdi-account' },
                { title: 'Users', icon: 'mdi-account-group-outline' },
            ],
            imgList: {

            },
            loadUrl: [],
            mini: true,
            userBoards: [],
            selectedBoard: '',
            isLoaded: false,
            cardsList: [],
            page: 1,
            itemsPerPage:12,
            nameFilter:''
        }
    },
    async mounted() {
        let { data } = await this.$axios.get('/user/boards')
        this.userBoards = data
        if (!this.userBoards.length) {
            return
        }
        this.selectedBoard = this.userBoards[0].id
        await this.searchCards()
        this.isLoaded = true
    },
    computed: {
        getPageItems() {
            const index = (this.page - 1) * this.itemsPerPage
            return this.filteredItems.slice(index, index + this.itemsPerPage) || null
        },
        totalPages(){
            return Math.ceil(this.filteredItems.length / this.itemsPerPage);
        },
        filteredItems(){
        if(this.nameFilter){
            return this.cardsList.filter(card =>card.name.includes(this.nameFilter))
        }
        return this.cardsList
    },
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
        async searchCards() {
            let { data: userCards } = await this.$axios.get('/user/board/' + this.selectedBoard + '/cards')
            this.cardsList = userCards
        }
    },
    watch: {
        selectedBoard() {
            this.searchCards()
        }
    }
}
</script>

<style scoped>
.sheet-y {
    min-height: 100vh;
}

.main-container {
    min-height: 100% !important;
}

::v-deep header {
    z-index: 999 !important;
}

.stretch {
    align-items: stretch !important;
}

.view-btn {
    position: absolute;
    bottom: 8px;
    right: 8px;
}
.nogrow{
    flex-grow: 0;
}
</style>