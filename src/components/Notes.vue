<script setup>
</script>

<template>
  <div class="menu-item">
    <div class="container">
      <div class="sticky-note">
        <textarea placeholder="Write your note here..."></textarea>
        <button id="addButton" class="add-note-button">+</button>
        <button id="closeButton" class="close-button">×</button>
      </div>
    </div>
    <div class="back-arrow">
      <i class="material-icons icon-large" onclick="window.history.back()"
        >arrow_back_ios</i
      >
    </div>
  </div>
</template>
