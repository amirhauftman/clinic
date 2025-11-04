import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import chalk from 'chalk';

export class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NotFoundError';
    }
}

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(chalk.red('🔥 Error:'), err);

    if (err instanceof ZodError) {
        return res.status(400).json({
            error: 'Validation failed',
            details: err.errors,
        });
    }

    if (err instanceof NotFoundError) {
        return res.status(404).json({ error: err.message });
    }

    res.status(500).json({ error: 'Internal server error' });
};