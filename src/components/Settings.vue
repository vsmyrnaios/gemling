<script setup></script>

<template>
  <div class="container" id="container-box">
    <button id="closeButton" class="close-button">×</button>
    <button id="settings" class="settings hidden">⚙️</button>
    <div id="settingsMenu" class="settings-menu hidden">
      <button class="settings-option" data-theme="theme-default">
        Default Theme
      </button>
      <button class="settings-option" data-theme="theme-dark">
        Dark Theme
      </button>
      <button class="settings-option" data-theme="theme-colorful">
        Colorful Theme
      </button>
      <button class="settings-option" data-theme="theme-elegant">
        Elegant Theme
      </button>
    </div>
  </div>
</template>
