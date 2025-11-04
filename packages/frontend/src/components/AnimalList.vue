<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useAnimalStore } from '@/stores/useAnimalStore';
import { StyledTable, StyledButton } from './styled';
import LoadingSpinner from './LoadingSpinner.vue';
import AnimalForm from './AnimalForm.vue';
import type { Animal } from '@/types';

const router = useRouter();
const store = useAnimalStore();
const toast = useToast();
const showAddModal = ref(false);
const loading = ref(true);

onMounted(async () => {
  try {
    await store.fetchAnimals();
  } catch (error) {
    toast.error('Failed to load animals');
  } finally {
    loading.value = false;
  }
});

const handleView = (id: number) => {
  router.push(`/animal/${id}`);
};
</script>

<template>
  <div class="animal-list">
    <div class="header">
      <h2>Animals</h2>
      <StyledButton @click="showAddModal = true">
        Add Animal
      </StyledButton>
    </div>

    <LoadingSpinner v-if="loading" />
    
    <StyledTable v-else>
      <thead>
        <tr>
          <th>Name</th>
          <th>Species</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="animal in store.animals" :key="animal.id">
          <td>{{ animal.name }}</td>
          <td>{{ animal.species }}</td>
          <td>{{ animal.age }} years</td>
          <td>
            <StyledButton 
              class="secondary"
              @click="handleView(animal.id)"
            >
              View Details
            </StyledButton>
          </td>
        </tr>
      </tbody>
    </StyledTable>

    <AnimalForm 
      v-if="showAddModal"
      @close="showAddModal = false"
      @added="store.fetchAnimals()"
    />
  </div>
</template>

<style scoped>
.animal-list {
  padding: 1rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>