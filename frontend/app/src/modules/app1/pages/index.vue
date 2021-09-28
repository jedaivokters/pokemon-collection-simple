<template>
  <div id="index">
    <div class="col-lg-12">
      <div class="au-card au-card--no-shadow au-card--no-pad m-b-40">
        <div
          class="au-card-title"
          style="
            background-image: url('images/bg-title-01.jpg');
            background-size: cover;
            background-position: top;
          "
        >
          <div class="bg-overlay bg-overlay--blue"></div>
          <h3>
            <i class="zmdi zmdi-format-align-justify"></i>My collections ({{
              totalCollection
            }})
          </h3>
          <button
            class="au-btn-plus"
            data-toggle="modal"
            data-target="#exampleModalCenter"
          >
            <i class="zmdi zmdi-plus"></i>
          </button>
        </div>

        <!--- Modals --->
        <add-pokemon-modal />
        <success-pokemon-modal />

        <div class="au-task js-list-load">
          <div class="au-task-list" style="min-height: 500px">
            <div
              class="d-flex justify-content-center mt-5"
              v-if="collections.length == 0"
            >
              No Collections. Please "add" by clicking (+) above
            </div>
            <div
              class="au-task__item au-task__item"
              v-for="c in collections"
              :key="c.id"
            >
              <div class="au-task__item-inner">
                <div class="d-flex">
                  <div class="col-1">
                    <img
                      :src="
                        pokemons[pokemons.findIndex((el) => el.name == c.name)]
                          .image_url
                      "
                      class="rounded float-left img-fluid img-thumbnail"
                      width="100"
                      alt="..."
                    />
                  </div>
                  <div class="col">
                    <h5>{{ c.nickname }}</h5>
                    <small> Official Name: {{ c.name }} </small>
                  </div>
                </div>
                <span class="time ml-3">ID: {{ c.id }}</span>
              </div>
            </div>
          </div>
          <div class="au-task__footer">
            <router-link
              tag="button"
              class="btn btn-primary"
              :to="{ name: 'collections' }"
            >
              Manage Collection
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from "../../../main";
import { mapState } from "vuex";

import AddPokemonModal from "../components/addPokemonModal.vue";
import SuccessPokemonModal from "../components/successPokemonModal.vue";
export default {
  components: {
    AddPokemonModal,
    SuccessPokemonModal,
  },
  computed: {
    ...mapState("app1", ["pokemons"]),
  },
  data() {
    return {
      collections: [],
      totalCollection: 0,
    };
  },
  created() {
    this.listeners();
  },
  async mounted() {
    if (this.$route.query["success"]) $("#savePokemon").modal("show");
  },
  methods: {
    listeners() {
      eventBus.$on("fetchCollection", async () => {
        const collections = await this.$api
          .get("p/list", {
            params: {
              limit: 10,
            },
          })
          .then((r) => r.data);

        this.collections = collections.data;
        this.totalCollection = collections.total;
      });
    },
  },
};
</script>
