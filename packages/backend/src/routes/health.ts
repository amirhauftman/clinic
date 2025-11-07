import { Router } from 'express';
import { prisma } from '../server';
import logger from '../utils/logger';

const router = Router();

router.get('/health', async (req, res) => {
    try {
        // Check database connection
        await prisma.$queryRaw`SELECT 1`;

        const health = {
            uptime: process.uptime(),
            message: 'OK',
            timestamp: Date.now(),
            database: 'Connected',
        };

        logger.info('Health check passed', health);
        res.status(200).json(health);
    } catch (error) {
        const health = {
            uptime: process.uptime(),
            message: 'ERROR',
            timestamp: Date.now(),
            database: 'Disconnected',
        };

        logger.error('Health check failed', { error });
        res.status(503).json(health);
    }
});

export { router as healthRouter };