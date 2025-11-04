<script setup lang="ts">
import AnimalList from '@/components/AnimalList.vue';
</script>

<template>
  <div class="home">
    <h1>VetClinic Pro</h1>
    <AnimalList />
  </div>
</template>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
}

@media (max-width: 768px) {
  .home {
    padding: 1rem;
  }
}
</style>