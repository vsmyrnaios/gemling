<script setup>
import MainContent from "./components/MainContent.vue";
import Notes from "./components/Notes.vue";
import Sidebar from "./components/Sidebar.vue";
import Tasks from "./components/Tasks.vue";
</script>

<template>
  <nav>
    <RouterLink to="/settings">Settings</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
