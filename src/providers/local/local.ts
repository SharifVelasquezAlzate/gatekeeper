import Provider, { ErrorHandler } from '@/lib/Provider';

import type { Request, Response, NextFunction } from 'express';
import type { SessionData } from 'express-session';

type Handler = (
	username: unknown,
	password: unknown
) => NonNullable<SessionData['user'] | Promise<SessionData['user']>>;

interface Options {
    usernameField: string;
    passwordField: string;
}

function defaultErrorHandler(error: unknown, req: Request, res: Response) {
    return res.send(error).sendStatus(401);
}

class LocalProvider extends Provider<Handler> {
    private usernameField?: string;
    private passwordField?: string;

    constructor(handler: Handler, errorHandlerOrOptions?: ErrorHandler | Options) {
        let errorHandler;
        let options;

        if (typeof errorHandlerOrOptions === 'function') {
            errorHandler = errorHandlerOrOptions;
        } else if (typeof errorHandlerOrOptions === 'object') {
            options = errorHandlerOrOptions;
            errorHandler = defaultErrorHandler;
        }

        super(handler, errorHandler);

        this.usernameField = options?.usernameField;
        this.passwordField = options?.passwordField;
    }

    public async process(req: Request, res: Response, next: NextFunction) {
        const username = (req.body as Record<string, unknown>)[this.usernameField ?? 'username'];
        const password = (req.body as Record<string, unknown>)[this.passwordField ?? 'password'];

        try {
            const handlerResult = await this.handler(username, password);
            const processedUser = handlerResult;
            return processedUser;
        } catch (error) {
            // In case there's no error handler defined, pass it on to Express
            if (typeof this.errorHandler !== 'function') {
                next(error);
                return undefined;
            }

            this.errorHandler(error, req, res, next);
            return undefined;
        }
    }
}

export default LocalProvider;
