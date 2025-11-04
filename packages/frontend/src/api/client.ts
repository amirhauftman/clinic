import axios from 'axios';
import type { Animal, Event } from '../types';


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
});

export const animalApi = {
    getAll: () => api.get<Animal[]>('/animals').then(res => res.data),
    getOne: (id: number) => api.get<Animal & { events: Event[] }>(`/animals/${id}`).then(res => res.data),
    create: (data: Omit<Animal, 'id'>) => api.post<Animal>('/animals', data).then(res => res.data),
    addEvent: (id: number, data: Omit<Event, 'id' | 'animalId'>) =>
        api.post<Event>(`/animals/${id}/events`, data).then(res => res.data),
    exportExcel: (id: number) => api.get(`/animals/${id}/export`, { responseType: 'blob' }),
};