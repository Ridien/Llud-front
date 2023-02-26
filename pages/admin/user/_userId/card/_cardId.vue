<template>
  <v-container>
    <v-row justify="start">
      <v-col v-if="cover && cover.scaled" cols="10">
        <v-img contain max-width="500" :src="cover.scaled.slice(-1)[0].url">
        </v-img>
      </v-col>
    </v-row>
    <v-row justify="start">
      <v-col cols="10">
        <h1 class="primary--text">
          {{ name }}
        </h1>
        <div
          v-if="Object.keys(cardObject).length > 0"
          class="black--text"
          style="white-space: pre-line"
        >
          <div v-for="item in Object.keys(cardObject)" :key="item">
            <h3 class="font-weight-bold">
              {{ item }}
            </h3>

            {{ cardObject[item] }}
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
  
  <script>
export default {
  data() {
    return {
      cardObject: {},
      name: "",
      cover: null,
    };
  },
  async mounted() {
    try {
      const { data } = await this.$axios.get(
        "/admin/cards/user/" +
          this.$route.params.userId +
          "/card/" +
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
};
</script>
  
<style scoped>
::v-deep header {
    z-index: 999 !important;
}
</style>