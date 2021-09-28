<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="savePokemon"
      tabindex="-1"
      role="dialog"
      data-show="true"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
      data-keyboard="false"
      data-backdrop="static"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Congratulations!
            </h5>
          </div>
          <div class="modal-body">
            <div class="au-task__item au-task__item--warning">
              <div class="au-task__item-inner">
                <h1>You got {{ pokemons[selected].name }}</h1>
                <div class="d-flex">
                  <div class="col-4">
                    <img
                      :src="pokemons[selected].image_url"
                      class="rounded float-left img-fluid img-thumbnail"
                      width="100"
                      alt="..."
                    />
                  </div>
                  <div class="col">
                    <small>{{ pokemons[selected].text }}</small>
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
                        v-model="myName"
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
import { mapState } from "vuex";
import { eventBus } from "../../../main";

export default {
  data() {
    return {
      selected: 0,
      myName: null,
    };
  },
  mounted() {
    if (this.$route.query["success"]) {
      // Normally need to check on server if payment is success by session ID
      this.selected = Math.floor(Math.random() * this.pokemons.length);
    }
  },
  computed: {
    ...mapState("app1", ["pokemons"]),
  },
  methods: {
    async gotcha() {
      //   const ref = this.$route.query["ref"]; //
      const data = {
        name: this.pokemons[this.selected]["name"],
        metadata: this.pokemons[this.selected]["metadata"],
        nickname: this.myName,
      };

      // Save to database
      await this.$api.post("p/store", data);

      $("#savePokemon").modal("toggle");
      this.myName = null;
      this.selected = 0;

      eventBus.$emit("fetchCollection");

      //   this.$router.push({ name: this.$route.query["ref"] });
    },
  },
};
</script>
