<script setup lang="ts">
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { StyledButton } from './styled';
import { animalApi } from '@/api/client';

const props = defineProps<{
  animalId: number;
  animalName: string;
}>();

const toast = useToast();
const loading = ref(false);

const handleExport = async () => {
  loading.value = true;
  try {
    const response = await animalApi.exportExcel(props.animalId);
    const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${props.animalName}_history.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    toast.success('Export successful');
  } catch (error) {
    toast.error('Failed to export data');
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <StyledButton 
    class="secondary"
    :disabled="loading"
    @click="handleExport"
  >
    <span v-if="loading">Exporting...</span>
    <span v-else>Export to Excel</span>
  </StyledButton>
</template>