<template>
  <v-row justify="center">
    <v-col cols="3">
      <v-text-field label="url" v-model="cardUrl"></v-text-field>
    </v-col>
    <v-col cols="3">
      <v-text-field label="user" v-model="userId"></v-text-field>
    </v-col>
    <v-col cols="3">
      <v-text-field label="type" v-model="permissionType"></v-text-field>
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
      userId: "",
      permissionType: "view",
    };
  },
  methods: {
    async grantPermission() {
      try {
        await this.$axios.post("/admin/permission/grant", {
          cardUrl: this.cardUrl,
          permissionType: this.permissionType,
          userId: this.userId,
        });
      } catch (error) {
        console.log(error)
      }
    },
  },
};
</script>

<style>
</style>