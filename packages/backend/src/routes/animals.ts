import { Router } from 'express';
import { prisma } from '../server';
import { AnimalSchema, EventSchema } from '../schemas';
import type { Animal as PrismaAnimal, Event as PrismaEvent } from '@prisma/client';
import { differenceInYears } from 'date-fns';
import ExcelJS from 'exceljs';
import { NotFoundError } from '../middleware/errorHandler';
import chalk from 'chalk';
const router = Router();

// GET /api/animals
router.get('/', async (req, res, next) => {
    try {
        console.log(chalk.blue('📋 Fetching all animals...'));
        const animals = await prisma.animal.findMany({
            orderBy: { name: 'asc' },
        });

        const animalsWithAge = animals.map((animal: PrismaAnimal) => ({
            ...animal,
            age: differenceInYears(new Date(), animal.birthDate),
        }));

        console.log(chalk.green(`✨ Found ${animals.length} animals`));
        res.json(animalsWithAge);
    } catch (error) {
        next(error);
    }
});

// POST /api/animals
router.post('/', async (req, res, next) => {
    try {
        console.log(chalk.blue('🐾 Creating new animal...'));
        const data = AnimalSchema.parse(req.body);
        const animal = await prisma.animal.create({
            data: {
                ...data,
                birthDate: new Date(data.birthDate),
            },
        });
        console.log(chalk.green(`✨ Created animal: ${animal.name}`));
        res.status(201).json(animal);
    } catch (error) {
        next(error);
    }
});

// GET /api/animals/:id
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(chalk.blue(`🔍 Fetching animal ${id}...`));

        const animal = await prisma.animal.findUnique({
            where: { id: Number(id) },
            include: {
                events: {
                    orderBy: { eventDate: 'desc' },
                },
            },
        });

        if (!animal) {
            throw new NotFoundError(`Animal with ID ${id} not found`);
        }

        console.log(chalk.green(`✨ Found ${animal.name} with ${animal.events.length} events`));
        res.json(animal);
    } catch (error) {
        next(error);
    }
});

// POST /api/animals/:id/events
router.post('/:id/events', async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(chalk.blue(`📝 Adding event for animal ${id}...`));

        const data = EventSchema.parse(req.body);

        const event = await prisma.event.create({
            data: {
                ...data,
                animalId: Number(id),
                eventDate: data.eventDate ? new Date(data.eventDate) : new Date(),
            },
            include: {
                animal: true,
            },
        });

        console.log(chalk.green(`✨ Added ${event.type} event for ${event.animal.name}`));
        res.status(201).json(event);
    } catch (error) {
        next(error);
    }
});

// GET /api/animals/:id/export
router.get('/:id/export', async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(chalk.blue(`📊 Exporting animal ${id} history...`));

        const animal = await prisma.animal.findUnique({
            where: { id: Number(id) },
            include: { events: true },
        });

        if (!animal) {
            throw new NotFoundError(`Animal with ID ${id} not found`);
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Animal History');

        // Style header
        worksheet.getCell('A1').value = `Medical History: ${animal.name} (${animal.species})`;
        worksheet.getCell('A1').font = { size: 14, bold: true };
        worksheet.mergeCells('A1:D1');

        // Add info section
        worksheet.getCell('A3').value = 'Name:';
        worksheet.getCell('B3').value = animal.name;
        worksheet.getCell('A4').value = 'Species:';
        worksheet.getCell('B4').value = animal.species;
        worksheet.getCell('A5').value = 'Birth Date:';
        worksheet.getCell('B5').value = animal.birthDate.toLocaleDateString();
        worksheet.getCell('A6').value = 'Age:';
        worksheet.getCell('B6').value = `${differenceInYears(new Date(), animal.birthDate)} years`;

        // Style info section
        ['A3', 'A4', 'A5', 'A6'].forEach((cell: string) => {
            worksheet.getCell(cell).font = { bold: true };
        });

        // Add events table headers
        const headerRow = worksheet.getRow(8);
        headerRow.values = ['Date', 'Type', 'Description'];
        headerRow.font = { bold: true };
        headerRow.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFE0E0E0' }
        };

        // Add events data
        animal.events.forEach((event: PrismaEvent, index: number) => {
            const row = worksheet.getRow(index + 9);
            row.values = [
                event.eventDate.toLocaleDateString(),
                event.type,
                event.description,
            ];
        });

        // Style worksheet
        worksheet.columns.forEach(column => {
            column.width = 15;
        });
        worksheet.getColumn(3).width = 50; // Description column wider

        console.log(chalk.green(`✨ Generated Excel report for ${animal.name}`));
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=${animal.name}_history.xlsx`);

        await workbook.xlsx.write(res);
    } catch (error) {
        next(error);
    }
});

export { router as animalsRouter };