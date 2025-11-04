export interface Animal {
    id: number;
    name: string;
    species: string;
    birthDate: string;
    age?: number;
}

export interface Event {
    id: number;
    animalId: number;
    type: 'Visit' | 'Treatment' | 'Observation';
    description: string;
    eventDate: string;
}