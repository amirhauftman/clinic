<script setup lang="ts">
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { StyledCard, StyledButton } from './styled';
import type { Animal } from '@/types';
import { animalApi } from '@/api/client';

const props = defineProps<{
  onClose: () => void;
  onAdded: () => void;
}>();

const toast = useToast();
const loading = ref(false);
const form = ref({
  name: '',
  species: '',
  birthDate: ''
});

const handleSubmit = async () => {
  loading.value = true;
  try {
    await animalApi.create(form.value);
    toast.success('Animal added successfully');
    props.onAdded();
    props.onClose();
  } catch (error) {
    toast.error('Failed to add animal');
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="modal-overlay" @click.self="onClose">
    <StyledCard class="modal-content">
      <h3>Add New Animal</h3>
      
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Name:</label>
          <input 
            id="name"
            v-model="form.name"
            type="text"
            required
          />
        </div>

        <div class="form-group">
          <label for="species">Species:</label>
          <input 
            id="species"
            v-model="form.species"
            type="text"
            required
          />
        </div>

        <div class="form-group">
          <label for="birthDate">Birth Date:</label>
          <input 
            id="birthDate"
            v-model="form.birthDate"
            type="date"
            required
          />
        </div>

        <div class="actions">
          <StyledButton 
            type="button" 
            class="secondary"
            @click="onClose"
          >
            Cancel
          </StyledButton>
          <StyledButton 
            type="submit"
            :disabled="loading"
          >
            {{ loading ? 'Adding...' : 'Add Animal' }}
          </StyledButton>
        </div>
      </form>
    </StyledCard>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  width: 100%;
  max-width: 400px;
  margin: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
}
</style>