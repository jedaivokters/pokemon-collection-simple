<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="updatePokemon"
      tabindex="-1"
      role="dialog"
      data-show="true"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Update Pokemon
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="au-task__item au-task__item--warning">
              <div class="au-task__item-inner">
                <h1>{{ row.name }}</h1>
                <div class="d-flex">
                  <div class="col-4">
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
                  </div>
                  <div class="col">
                    {{
                      pokemons[pokemons.findIndex((el) => el.name == row.name)]
                        .text
                    }}
                  </div>
                </div>
                <form @submit.prevent="gotcha()">
                  <div class="d-flex">
                    <div class="form-group col">
                      <label for="company" class="form-control-label"></label>
                      <input
                        type="text"
                        placeholder="Enter preferred name"
                        class="form-control"
                        required
                        v-model="row.nickname"
                      />
                    </div>
                  </div>
                  <div class="d-flex">
                    <button class="btn btn-primary">Gotcha!</button>
                  </div>
                </form>
              </div>
            </div>

            <div class="au-task__footer"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const defaultSearch = "Pikachu";
import { mapState } from "vuex";
import { eventBus } from "../../../main";

export default {
  props: {
    row: {
      default: () => ({
        name: defaultSearch,
        nickname: "",
      }),
    },
  },
  data() {
    return {};
  },
  mounted() {},
  computed: {
    ...mapState("app1", ["pokemons"]),
  },
  methods: {
    async gotcha() {
      const data = {
        nickname: this.row.nickname,
      };

      // Save to database
      await this.$api.put(`p/${this.row.id}/update`, data);

      $("#updatePokemon").modal("toggle");

      this.$toast.success(`Successfully updated as "${this.row.nickname}".`, {
        position: "top-right",
        duration: 3000,
      });

      eventBus.$emit("fetchCollection");
    },
  },
};
</script>
