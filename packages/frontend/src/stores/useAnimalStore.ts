import { defineStore } from 'pinia';
import type { Animal, Event } from '../types';
import { animalApi } from '../api/client';

interface AnimalState {
    animals: Animal[];
    currentAnimal: (Animal & { events: Event[] }) | null;
    loading: boolean;
    error: string | null;
}

export const useAnimalStore = defineStore('animal', {
    state: (): AnimalState => ({
        animals: [],
        currentAnimal: null,
        loading: false,
        error: null,
    }),

    actions: {
        async fetchAnimals() {
            this.loading = true;
            try {
                this.animals = await animalApi.getAll();
                this.error = null;
            } catch (error) {
                this.error = 'Failed to fetch animals';
                console.error(error);
            } finally {
                this.loading = false;
            }
        },

        async fetchAnimal(id: number) {
            this.loading = true;
            try {
                this.currentAnimal = await animalApi.getOne(id);
                this.error = null;
            } catch (error) {
                this.error = 'Failed to fetch animal details';
                console.error(error);
            } finally {
                this.loading = false;
            }
        },

        async createAnimal(data: Omit<Animal, 'id'>) {
            this.loading = true;
            try {
                const animal = await animalApi.create(data);
                this.animals.push(animal);
                this.error = null;
                return animal;
            } catch (error) {
                this.error = 'Failed to create animal';
                console.error(error);
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async addEvent(animalId: number, data: Omit<Event, 'id' | 'animalId'>) {
            this.loading = true;
            try {
                const event = await animalApi.addEvent(animalId, data);
                if (this.currentAnimal && this.currentAnimal.id === animalId) {
                    this.currentAnimal.events.unshift(event);
                }
                this.error = null;
                return event;
            } catch (error) {
                this.error = 'Failed to add event';
                console.error(error);
                throw error;
            } finally {
                this.loading = false;
            }
        },
    },
});