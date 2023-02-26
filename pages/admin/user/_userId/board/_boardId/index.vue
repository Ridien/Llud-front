<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="8">
        <h4 class="primary--text">Filtros</h4>
        <v-row>
          <v-col cols="4">
            <v-text-field v-model="nameFilter" label="name"></v-text-field>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row no-gutters justify="center">
      <v-col cols="auto">
        <v-data-table
          :headers="[
            {
              text: 'name',
              value: 'name',
            },
            {
              text: 'actions',
              value: 'actions',
            },
          ]"
          :hide-default-footer="true"
          :items="currentPageList"
        >
          <template v-slot:item.actions="{ item }">
            <v-btn
              @click="
                $router.push({
                  name: 'admin-userId-card-cardId',
                  params: {
                    cardId: item.id,
                    userId: $route.params.userId,
                  },
                })
              "
              class="primary white--text"
              >View</v-btn
            >
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-pagination
        v-model="page"
        :length="totalPages"
        :total-visible="7"
        circle
      ></v-pagination>
    </v-row>
  </v-container>
</template>
  
  <script>
import { computed } from "vue";
export default {
  data() {
    return {
      cardsList: [],
      page: 1,
      itemsPerPage: 10,
      nameFilter: "",
    };
  },
  async mounted() {
    const { data } = await this.$axios.get(
      "/admin/cards/user/" + this.$route.params.userId +"/board/"+this.$route.params.boardId
    );
    this.cardsList = data;

    console.log(this.cardsList);
  },
  computed: {
    currentPageList() {
      const startingPoint = (this.page - 1) * this.itemsPerPage;
      return this.filteredItems.slice(startingPoint, startingPoint + 10);
    },
    filteredItems() {
      if (this.nameFilter) {
        return this.cardsList.filter((card) =>
          card.name.includes(this.nameFilter)
        );
      }
      return this.cardsList;
    },
    totalPages() {
      return Math.ceil(this.filteredItems.length / this.itemsPerPage);
    },
  },
  watch: {
    nameFilter: {
      handler() {
        this.page = 1;
      },
    },
  },
};
</script>
  
  <style>
</style>