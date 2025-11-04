import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { animalsRouter } from './routes/animals';
import { errorHandler } from './middleware/errorHandler';
import chalk from 'chalk';

dotenv.config();

export const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/animals', animalsRouter);

// Error handling
app.use(errorHandler);

// Start server
app.listen(port, () => {
    console.log(chalk.green(`🚀 Server running at http://localhost:${port}`));
    console.log(chalk.blue('📚 API Documentation available at:'), chalk.cyan(`http://localhost:${port}/api`));
});

// Graceful shutdown
process.on('SIGTERM', async () => {
    console.log(chalk.yellow('🔄 Shutting down gracefully...'));
    await prisma.$disconnect();
    process.exit(0);
});