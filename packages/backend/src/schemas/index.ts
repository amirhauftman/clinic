import { z } from 'zod';

export const AnimalSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    species: z.string().min(1, 'Species is required'),
    birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
});

export const EventSchema = z.object({
    type: z.enum(['Visit', 'Treatment', 'Observation'], {
        errorMap: () => ({ message: 'Type must be Visit, Treatment, or Observation' }),
    }),
    description: z.string().min(1, 'Description is required'),
    eventDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)').optional(),
});