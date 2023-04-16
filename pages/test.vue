<template>
    <div>
        <img v-if="!!imgList[url]" :src='imgList[url]' alt="Girl in a jacket" />
        <div style="display:none">
            {{
                getImgByUrl(url)
            }} 
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            imgList:{},
            display:false,
            url: 'https://trello.com/1/cards/62bb3b935b11884e29af1101/attachments/62bb3b984b0c1e6936e1a3c7/previews/62bb3b9a4b0c1e6936e1a428/download/image.png'
        }
    },
    watch: {
        imgSrc(val){
            console.log(val)
        }
    },
    methods: {
        async getImgByUrl(url) {
            let data = await this.$axios.get('user/img', {
                params: {
                    img_url: url
                }
            })
            this.$set(this.imgList, url, data.data)
            return true
        },
    }
}
</script>

<style lang="scss" scoped>

</style>