<template>
  <v-container>
    <v-row no-gutters align="center" justify="start">
      <v-col cols="3">
        <v-select
          label="conceder permissão"
          @change="getUserPermissionsInCard"
          v-model="userSelected"
          :items="users"
          item-text="nickname"
          item-value="id"
        ></v-select>
      </v-col>
      <v-col cols="3" v-if="userSelected && !permissionList.includes('view')">
        <v-btn
          block
          class="primary"
          @click="addPermissionToUser(userSelected, 'view', $route.params.id)"
          >Add View Permission</v-btn
        >
      </v-col>
      <v-col cols="3" v-else-if="permissionList.includes('view')">
        <v-icon color="success">mdi-check-circle-outline</v-icon>
      </v-col>
    </v-row>
    <v-row no-gutters v-if="userSelected">
        <v-btn class="success" @click="$router.push({
                  name: 'admin-user-userId-card-cardId',
                  params: {
                    cardId: $route.params.id,
                    userId: userSelected,
                  },
                })">
            View card as user
        </v-btn>
    </v-row>
    <v-row justify="start">
      <v-col v-if="cardData.cover && cardData.cover.scaled" cols="10">
        <v-img
          contain
          max-width="500"
          :src="cardData.cover.scaled.slice(-1)[0].url"
        >
        </v-img>
      </v-col>
      <v-col cols="3" v-if="userSelected && !permissionList.includes('cover') && cardData.cover && cardData.cover.scaled">
        <v-btn
          block
          class="primary"
          @click="addPermissionToUser(userSelected, 'cover', $route.params.id)"
          >Add Cover Permission</v-btn
        >
      </v-col>
      <v-col cols="3" v-else-if="permissionList.includes('cover')">
        <v-icon color="success">mdi-check-circle-outline</v-icon>
      </v-col>
    </v-row>
    <v-row justify="start">
      <v-col cols="10">
        <h1 class="primary--text">
          {{ cardData.name }}
        </h1>
        <p
          v-if="Object.keys(cardObject).length === 0"
          class="black--text"
          style="white-space: pre-line"
        >
          {{ cardData.desc }}
        </p>
        <div v-else class="black--text" style="white-space: pre-line">
          <div v-for="(item, idx) in Object.keys(cardObject)" :key="item">
            <v-row no-gutters justify="start" align="end">
              <h3 class="font-weight-bold">
                {{ item }}
              </h3>
              <v-btn
                class="mb-n1 ml-5"
                v-if="userSelected && !permissionList.includes(item)"
                @click="
                  addPermissionToUser(userSelected, item, $route.params.id)
                "
                color="primary"
              >
                Add Permission
              </v-btn>
              <v-icon
                color="success"
                class="mb-1 ml-5"
                v-else-if="permissionList.includes(item)"
                >mdi-check-circle-outline</v-icon
              >
            </v-row>

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
      cardData: {},
      cardObject: {},
      users: [],
      userSelected: null,
      showButtons: false,
      permissionList: [],
    };
  },
  async mounted() {
    const { data: userData } = await this.$axios.get("/admin/user/get-all");
    this.users = userData;
    const { data } = await this.$axios.get(
      "/admin/cards/" + this.$route.params.id
    );
    this.cardData = data.card_data;
    this.cardObject = data.card_object;
  },
  methods: {
    async getUserPermissionsInCard() {
      const { data } = await this.$axios.get(
        "/admin/cards/user/" +
          this.userSelected +
          "/card/" +
          this.$route.params.id +
          "/list-permissions"
      );
      this.permissionList = data;
    },
    async addPermissionToUser(userId, type, cardId) {
      try {
        await this.$axios.post("/admin/permission/grant", {
          cardUrl: cardId,
          permissionType: type,
          userId: userId,
        });
        await this.getUserPermissionsInCard();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
</style>