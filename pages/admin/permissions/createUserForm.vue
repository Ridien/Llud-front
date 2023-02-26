<template>
  <v-row justify="center">
    <v-col cols="3">
      <v-text-field label="username" v-model="username"></v-text-field>
    </v-col>
    <v-col cols="3">
      <v-text-field label="password" v-model="password"></v-text-field>
    </v-col>
    <v-col cols="3">
      <v-btn @click="createUser" class="primary">Create</v-btn>
    </v-col>
  </v-row>
</template>
  
  <script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async createUser() {
      await this.$axios.post("/admin/user/new", {
        password: this.password,
        nickname: this.username,
      });
    },
  },
};
</script>
  
  <style>
</style>