<script setup lang="ts">
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { StyledCard, StyledButton } from './styled';
import { animalApi } from '@/api/client';
import type { Event } from '@/types';

const props = defineProps<{
  animalId: number;
  onAdded: () => void;
}>();

const toast = useToast();
const loading = ref(false);
const form = ref({
  type: 'Visit' as 'Visit' | 'Treatment' | 'Observation',
  description: '',
  eventDate: new Date().toISOString().split('T')[0]
});

const handleSubmit = async () => {
  loading.value = true;
  try {
    await animalApi.addEvent(props.animalId, form.value);
    toast.success('Event added successfully');
    form.value.description = '';
    props.onAdded();
  } catch (error) {
    toast.error('Failed to add event');
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <StyledCard>
    <h3>Add Event</h3>
    
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="type">Type:</label>
        <select 
          id="type"
          v-model="form.type"
          required
        >
          <option value="Visit">Visit</option>
          <option value="Treatment">Treatment</option>
          <option value="Observation">Observation</option>
        </select>
      </div>

      <div class="form-group">
        <label for="description">Description:</label>
        <textarea 
          id="description"
          v-model="form.description"
          required
          rows="3"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="eventDate">Date:</label>
        <input 
          id="eventDate"
          v-model="form.eventDate"
          type="date"
          required
        />
      </div>

      <StyledButton 
        type="submit"
        :disabled="loading"
      >
        {{ loading ? 'Adding...' : 'Add Event' }}
      </StyledButton>
    </form>
  </StyledCard>
</template>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

select, textarea, input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

textarea {
  resize: vertical;
  min-height: 80px;
}
</style>