<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useAnimalStore } from '@/stores/useAnimalStore';
import { StyledCard, StyledButton, StyledTable } from '@/components/styled';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import EventForm from '@/components/EventForm.vue';
import ExportButton from '@/components/ExportButton.vue';
import dayjs from 'dayjs';

const route = useRoute();
const router = useRouter();
const store = useAnimalStore();
const toast = useToast();
const loading = ref(true);

const animalId = Number(route.params.id);

onMounted(async () => {
  try {
    await store.fetchAnimal(animalId);
    if (!store.currentAnimal) {
      toast.error('Animal not found');
      router.push('/');
    }
  } catch (error) {
    toast.error('Failed to load animal details');
    router.push('/');
  } finally {
    loading.value = false;
  }
});

const handleBack = () => {
  router.push('/');
};

const formatDate = (date: string) => {
  return dayjs(date).format('MMMM D, YYYY');
};
</script>

<template>
  <div class="animal-detail">
    <div class="header">
      <StyledButton class="secondary" @click="handleBack">
        ← Back to List
      </StyledButton>
    </div>

    <LoadingSpinner v-if="loading" />

    <template v-else-if="store.currentAnimal">
      <StyledCard class="info-card">
        <div class="animal-header">
          <div>
            <h1>{{ store.currentAnimal.name }}</h1>
            <p class="species">{{ store.currentAnimal.species }}</p>
            <p class="birth-date">
              Born: {{ formatDate(store.currentAnimal.birthDate) }}
              ({{ store.currentAnimal.age }} years old)
            </p>
          </div>
          <ExportButton 
            :animal-id="animalId"
            :animal-name="store.currentAnimal.name"
          />
        </div>
      </StyledCard>

      <div class="content-grid">
        <div class="events-list">
          <h2>Medical History</h2>
          <StyledTable>
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="event in store.currentAnimal.events" :key="event.id">
                <td>{{ formatDate(event.eventDate) }}</td>
                <td>{{ event.type }}</td>
                <td>{{ event.description }}</td>
              </tr>
            </tbody>
          </StyledTable>
        </div>

        <div class="add-event">
          <EventForm 
            :animal-id="animalId"
            @added="store.fetchAnimal(animalId)"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.animal-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.header {
  margin-bottom: 2rem;
}

.info-card {
  margin-bottom: 2rem;
}

.animal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

h1 {
  margin: 0;
  color: #2c3e50;
}

.species {
  font-size: 1.2em;
  color: #42b883;
  margin: 0.5rem 0;
}

.birth-date {
  color: #666;
  margin: 0;
}

.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.events-list h2 {
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .animal-detail {
    padding: 1rem;
  }

  .content-grid {
    grid-template-columns: 1fr;
  }

  .animal-header {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>