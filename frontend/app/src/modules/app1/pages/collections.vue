<template>
  <div id="collections">
    <!--- Modals --->
    <add-pokemon-modal />
    <success-pokemon-modal />
    <confirmation-modal :row="row" @onDelete="deleteMe" />
    <update-pokemon-modal :row="row" />

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
          <h3><i class="fas fa-wrench"></i>Manage Collections</h3>
          <button
            class="au-btn-plus"
            data-toggle="modal"
            data-target="#exampleModalCenter"
          >
            <i class="zmdi zmdi-plus"></i>
          </button>
        </div>

        <div class="au-task js-list-load p-5">
          <div class="row">
            <div class="card col">
              <div class="card-body">
                <BeeGridTable
                  :columns="columns"
                  :data="data"
                  :showPager="false"
                >
                  <template slot-scope="{ row }" slot="expand">
                    <div>Height： {{ row.metadata.height }}</div>
                    <div>Weight: {{ row.metadata.weight }}</div>
                    <div>
                      Description:
                      {{
                        (() => {
                          let pokemons = $store.state.app1.pokemons;
                          return pokemons[
                            pokemons.findIndex((el) => el.name == row.name)
                          ].text;
                        })()
                      }}
                    </div>
                  </template>
                  <BeeColumn field="image" title="---">
                    <template slot-scope="{ row }">
                      <img
                        :src="
                          pokemons[
                            pokemons.findIndex((el) => el.name == row.name)
                          ].image_url
                        "
                        class="rounded float-left img-fluid img-thumbnail"
                        width="100"
                        alt="..."
                      />
                    </template>
                  </BeeColumn>
                  <BeeColumn field="ops" title="Operations" align="center">
                    <template slot-scope="{ row }">
                      <div class="d-flex justify-content-center">
                        <div class="mr-1">
                          <button
                            class="btn btn-primary"
                            @click.prevent="showDialog(row, 'updatePokemon')"
                          >
                            Update
                          </button>
                        </div>
                        <div class="">
                          <button
                            class="btn btn-warning"
                            @click.prevent="showDialog(row, 'confirmation')"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </template>
                  </BeeColumn>
                </BeeGridTable>
              </div>
            </div>
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
import ConfirmationModal from "../components/defaultConfirmationModal.vue";
import UpdatePokemonModal from "../components/updatePokemonModal.vue";
export default {
  components: {
    AddPokemonModal,
    SuccessPokemonModal,
    ConfirmationModal,
    UpdatePokemonModal,
  },
  computed: {
    ...mapState("app1", ["pokemons"]),
  },
  data() {
    return {
      row: {
        name: "Pikachu",
      },
      columns: [
        {
          type: "expand",
          hideFilter: true,
          slot: "expand",
          width: 50,
        },
        {
          key: "image",
          align: "center",
          hideFilter: true,
        },
        {
          title: "Nickname",
          key: "nickname",
          align: "center",
          resizable: false,
          sortable: true,
        },
        {
          title: "Name",
          key: "name",
          align: "center",
          sortable: true,
        },
        {
          title: "Operation",
          slot: "op",
          key: "ops",
          hideFilter: true,
          resizable: false,
          width: 150,
        },
      ],
      data: [],
    };
  },
  created() {
    this.listeners();
  },
  mounted() {
    eventBus.$emit("fetchCollection");

    if (this.$route.query["success"]) $("#savePokemon").modal("show");
  },
  methods: {
    listeners() {
      eventBus.$on("fetchCollection", async () => {
        const collections = await this.$api.get("p/list").then((r) => r.data);
        this.data = collections.data;
        this.totalCollection = collections.total;
      });
    },
    showDialog(row, modal) {
      $(`#${modal}`).modal("show");
      this.row = row;
    },
    async deleteMe(row) {
      await this.$api.delete(`p/${row.id}/delete`);
      $("#confirmation").modal("hide");
      this.$toast.success(`Deleted ${row.nickname}.`, {
        position: "top-right",
        duration: 3000,
      });

      eventBus.$emit("fetchCollection");
      this.row = {};
    },
  },
};
</script>
