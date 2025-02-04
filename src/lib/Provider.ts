import type { User } from './request';
import type { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Handler<Params extends unknown[] = any[]> = (
    ...args: Params
) => NonNullable<User> | Promise<NonNullable<User>>;

export type ErrorHandler = (error: unknown, req: Request, res: Response, next: NextFunction) => void;
export function isErrorHandler(x: unknown): x is ErrorHandler {
    return typeof x === 'function';
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export abstract class Provider<Options extends Record<string, any>, CustomHandler extends Handler = Handler> {
    // Needed so that the Options type doesn't appear as unknown in helper types like
    // ProviderOptions
    private _options!: Options;
    /**
     * Middleware that processes the request and returns a `Promise<User> | User`
     */
    protected handler: CustomHandler;
    /**
     * Handles custom errors thrown by the handler
     */
    protected errorHandler?: ErrorHandler;

    constructor(handler: CustomHandler, errorHandler?: ErrorHandler | null) {
        this.handler = handler;
        if (errorHandler !== null) this.errorHandler = errorHandler;
    }

    /**
     * Returns a user to be serialized and included in the `req` object (by default `req.session.user`)
     * (or returns undefined if the user should not be serialized nor set)
     *
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @returns {User | Promise<User> | undefined} the user to be saved
     * and serialized, or undefined to indicate user should not be saved nor serialized
     */
    public abstract process(
        req: Request,
        res: Response,
        next: NextFunction
    ): User | Promise<User | undefined> | undefined;
}

export class IncorrectHandlerReturn extends Error {
    constructor(message = 'Provider handler does not return a user.') {
        super(message);
        this.name = this.constructor.name;
    }
}

export default Provider;
