<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="confirmation"
      tabindex="-1"
      role="dialog"
      data-show="true"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" align="center">
            Are you sure you want to remove this item?
            <span class="text-danger">{{ name }}</span>
            <div class="au-task__footer">
              <button class="btn btn-danger" @click.prevent="confirm">
                Yep!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    row: {
      default: () => ({}),
    },
  },
  data() {
    return {};
  },
  mounted() {},
  computed: {
    ...mapState("app1", ["pokemons"]),
    name() {
      return this.row.hasOwnProperty("name")
        ? `${this.row.nickname} (${this.row.name})`
        : "";
    },
  },
  methods: {
    confirm() {
      this.$emit("onDelete", this.row);
    },
  },
};
</script>
