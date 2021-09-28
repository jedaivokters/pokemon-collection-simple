<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModalCenter"
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
              Catch Pokemon
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
            <div
              class="au-task__item au-task__item--warning"
              v-for="p in pokemons"
              :key="p.name"
            >
              <div class="au-task__item-inner">
                <div class="d-flex">
                  <div class="col-4">
                    <img
                      :src="p.image_url"
                      class="rounded float-left img-fluid img-thumbnail"
                      width="100"
                      alt="..."
                    />
                  </div>
                  <div class="col">
                    <h5>{{ p.name }}</h5>
                    <small>
                      {{ p.text }}
                    </small>
                  </div>
                </div>
              </div>
            </div>

            <div class="au-task__footer">
              <stripe-checkout
                ref="checkoutRef"
                mode="payment"
                :pk="pk"
                :line-items="lineItems"
                :success-url="successURL"
                :cancel-url="cancelURL"
                @loading="(v) => (loading = v)"
              />
              <button
                :disabled="loading"
                class="btn btn-primary"
                @click="payNow"
              >
                Randomly Catch for $10
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.thumbnail.right-caption > img {
  float: left;
  margin-right: 9px;
}

.thumbnail.right-caption {
  float: left;
}

.thumbnail.right-caption ::after {
  clear: both;
}

.thumbnail.right-caption > .caption {
  padding: 4px;
}
</style>
<script>
import { mapState } from "vuex";
import { StripeCheckout } from "@vue-stripe/vue-stripe";
import { eventBus } from "../../../main";

export default {
  components: {
    StripeCheckout,
  },
  data() {
    return {
      pk: "pk_test_51JdtM6CtVnHmeiHwdTTrLzWv7FODbC25dN4jss5XcL20QiRGBsjk18iUnM90jNi0rnsWwHuwq6weC2ZTLtCnlkht0021NgB7RL",
      loading: false,
      lineItems: [
        {
          price: "price_1JeDHaCtVnHmeiHw6n27XAag", // The id of the one-time price you created in your Stripe dashboard
          quantity: 1,
        },
      ],
      successURL: "",
      cancelURL: window.location.origin,
    };
  },
  async mounted() {
    this.successURL =
      window.location.origin +
      this.$route.path +
      "?success=true&ref=" +
      this.$route.name;
    await this.setPokemon();
  },
  computed: {
    ...mapState("app1", ["pokemons"]),
  },
  methods: {
    payNow() {
      this.$refs.checkoutRef.redirectToCheckout();
    },
    async setPokemon() {
      let res;
      let pokemons = [];

      for (let p in this.pokemons) {
        res = await this.$pokemon
          .get(`pokemon/${this.pokemons[p]["search"]}`)
          .then((r) => r.data);
        pokemons.push({
          search: this.pokemons[p].search,
          name: this.pokemons[p].name,
          text: this.pokemons[p].text,
          image_url: res.sprites.other["official-artwork"].front_default,
          metadata: res,
        });
      }

      this.$store.commit("app1/pokemons", pokemons);

      eventBus.$emit("fetchCollection");
    },
  },
};
</script>
