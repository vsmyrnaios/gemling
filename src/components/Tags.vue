<script setup>
const props = defineProps({
  tags: { type: Array, default: () => [] }
});
</script>

<template>
  <div class="p-4 bg-white shadow rounded-lg">
    <h2 class="text-xl font-bold mb-4">Tags</h2>
    <ul class="space-y-2">
      <li v-for="(tag, i) in props.tags" :key="i" class="flex items-center gap-2">
        <span class="px-2 py-1 bg-indigo-100 text-indigo-700 rounded">{{ tag.tag }}</span>
        <span class="text-gray-700">{{ tag.name }}</span>
      </li>
    </ul>
    <p v-if="!props.tags.length" class="text-gray-400">No tags yet...</p>
  </div>
</template>
