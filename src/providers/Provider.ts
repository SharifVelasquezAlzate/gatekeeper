import type { Request, Response, NextFunction } from 'express';
import type { SessionData } from 'express-session';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Handler<Params extends unknown[] = any[]> = (
	...args: Params
) => NonNullable<SessionData['user'] | Promise<SessionData['user']>>;

//? TODO: Should the return type of an ErrorHandler by void or could it be another error (one passed on to Express)?
/*
 * Error handler that can handle the errors included in the `PotentialErrors` type.
 */
export type ErrorHandler = (
	error: unknown,
	req: Request,
	res: Response,
	next: NextFunction
) => void;

export abstract class Provider<CustomHandler extends Handler = Handler> {
	/**
	 * Middleware that processes the request and returns a `Promise<SessionData['user']> | SessionData['user']`
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
	 * @returns {SessionData['user'] | Promise<SessionData['user']> | undefined} the user to be saved
	 * and serialized, or undefined to indicate user should not be saved nor serialized
	 */
	public abstract process(
		req: Request,
		res: Response,
		next: NextFunction
	): SessionData['user'] | Promise<SessionData['user']> | undefined;
}

export default Provider;
