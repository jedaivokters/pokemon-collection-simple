<template>
  <div id="blog_home">
    <Header />
    <div class="container">
      <h1>Todos</h1>
      <div class="card">
        <div class="card-body">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Note</th>
                <th scope="col">Status</th>
                <th scope="col">Date Completed</th>
                <th scope="col">Operation</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(t, index) in todos">
                <th scope="row">{{ t.id }}</th>
                <td>{{ t.title }}</td>
                <td>{{ t.note }}</td>
                <td>{{ t.status }}</td>
                <td>-NEED DATE COMPLETED-</td>
                <td>
                  <router-link
                    :to="{ name: 'todo-details', params: { id: t.id } }"
                    >View</router-link
                  >
                  <br />
                  <router-link
                    :to="{ name: 'todo-update', params: { id: t.id } }"
                    >Update</router-link
                  >
                  <br />
                  <a href="#" @click.prevent="doMarkComplete(t)"
                    >Mark as complete</a
                  >
                  <br />
                  <a href="#" @click.prevent="doDelete(t, index)">Delete</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
html {
  @import "@/assets/scss/_style.scss";
}
#header {
  background-color: rgb(27, 18, 109);
}
</style>

<script>
import Header from "../components/header";

export default {
  components: {
    Header,
  },
  data() {
    return {
      todos: [],
    };
  },
  async mounted() {
    this.todos = await this.$api.get("todo/list").then((r) => r.data.data);
  },
  methods: {
    doMarkComplete(t) {
      this.$confirm({
        message: `Are you sure you want to mark as complete?`,
        button: {
          no: "No",
          yes: "Yes",
        },
        callback: async (confirm) => {
          if (confirm) {
            const res = await this.$api
              .put(`todo/${t.id}/mark-complete`)
              .then((r) => r.data);

            if (res.error == null)
              this.todos = await this.$api
                .get("todo/list")
                .then((r) => r.data.data);
          }
        },
      });
    },
    doDelete(t, index) {
      this.$confirm({
        message: `Are you sure?`,
        button: {
          no: "No",
          yes: "Yes",
        },
        callback: async (confirm) => {
          if (confirm) {
            const res = await this.$api
              .delete(`todo/${t.id}/delete`)
              .then((r) => r.data);

            if (res.error == null) this.$delete(this.todos, index);
          }
        },
      });
    },
  },
};
</script>
