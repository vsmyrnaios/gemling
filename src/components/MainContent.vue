<script setup>
import Sidebar from "./Sidebar.vue";


/*methods: {
    goToAbout() {
      this.$router.push('/tasks')
    }
  }*/
</script>

<template>
  
  <!--<nav><Sidebar /></nav>-->
  <main>
    <RouterLink :to="{ path: 'tasks' }">Tasks </RouterLink>
    <RouterLink :to="{ path: 'notes' }">Notes </RouterLink>
    <RouterLink :to="{ path: 'premium' }">Premium </RouterLink>
  </main>
  <span class="material-icons icon" id="basic-settings"> tune icon TBD </span>
</template>

