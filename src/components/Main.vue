
<template>
  <div>
    <h1>View all appointments</h1>
    <table>
      <tr>
        <th>Name</th>
        <th>Comment</th>
        <th>Date</th>
        <th>time in</th>
        <th>time out</th>
        <th align="center">Action</th>
      </tr>

      <tr v-for="item in items" :key="item.id">
        <td>{{item.name}}</td>
        <td>{{item.comment}}</td>
        <td>{{item.date}}</td>
        <td>{{item.time_in}}</td>
        <td>{{item.time_out}}</td>
        <td>
          <div align="center" variant="row">
            <router-link :to="{ name: 'view', params: {id:item.id} }">
              <b-button variant="success" style="margin:10px;">Edit</b-button>
            </router-link>
            <b-button v-on:click="remove(item.id)">Delete</b-button>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Main",
  mounted: function () {
    axios.get("http://127.0.0.1:5000/").then((response) => {
      console.log(response.data.appointments);

      response.data.appointments.forEach((element) => this.items.push(element));
    });
  },
  data() {
    return {
      items: [],
    };
  },
  methods: {
    remove: async function (id) {
      const data = {
        id: id,
      };

      await axios
        .post("http://127.0.0.1:5000/delete", {
          data,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          alert("Error");
        });

      await axios.get("http://127.0.0.1:5000/").then((response) => {
        console.log(response.data.appointments);
        this.items = [];
        response.data.appointments.forEach((element) =>
          this.items.push(element)
        );
      });
    },
  },
};
</script>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>