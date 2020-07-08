<template>
  <main role="main" class="bw-bg">
    <div class="container">
        <nav class="navbar fixed-bottom navbar-light bg-light">
           <v-btn  to="/newvisa" x-large color="green" dark>New Application</v-btn>
           <v-btn x-large color="red" dark>Continue Application</v-btn>
           <v-btn x-large color="cyan" dark>Visa Status</v-btn>
        </nav>
      </div>
  </main>

</template>

<script>
export default {
  name: 'Home',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
