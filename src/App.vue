<template>
  <div>
    <div>
      <!-- As a link -->
      <b-navbar variant="faded" type="light">
        <b-container>
          <b-navbar-brand href="#">Doctor Appointment</b-navbar-brand>
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item>
                <router-link :to="{ name: 'main'}">View Appointments</router-link>
              </b-nav-item>
              <b-nav-item>
              <router-link :to="{ name: 'add'}">Add Appointment</router-link>
              </b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-container>
      </b-navbar>
    </div>
    <br />
    <b-container>
      <router-view></router-view>
      <v-app id="app"></v-app>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>