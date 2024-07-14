import Provider, { ErrorHandler } from '@/lib/Provider';

import type { User } from '@/lib/request';
import type { Request, Response, NextFunction } from 'express';

type Handler = (
    username: unknown,
    password: unknown
) => NonNullable<User> | Promise<NonNullable<User>>;
function isHandler(x: unknown): x is Handler {
    return typeof x === 'function';
}

interface Options {
    usernameField: string;
    passwordField: string;
}

class LocalProvider extends Provider<Options, Handler> {
    private usernameField?: string;
    private passwordField?: string;

    constructor(options: Options, handler: Handler, errorHandler?: ErrorHandler);
    constructor(handler: Handler, errorHandler?: ErrorHandler);
    constructor(
        optionsOrHandler: Options | Handler,
        handlerOrErrorHandler: Handler | ErrorHandler | undefined,
        errorHandler?: ErrorHandler
    ) {
        let handler;
        let options;

        if (isHandler(optionsOrHandler)) {
            handler = optionsOrHandler;
            errorHandler = handlerOrErrorHandler as ErrorHandler | undefined;
        } else {
            options = optionsOrHandler;
            handler = handlerOrErrorHandler as Handler;
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
