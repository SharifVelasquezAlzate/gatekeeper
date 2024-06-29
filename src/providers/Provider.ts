import type { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RequestHandler<Params extends unknown[] = any[]> = (
	...args: Params
) => NonNullable<Express.User | Promise<Express.User>>;

//? TODO: Should the return type of an ErrorHandler by void or could it be another error (one passed on to Express)?
/*
 * Error handler that can handle the errors included in the `PotentialErrors` type.
 */
export type ErrorHandler<PotentialErrors> = (req: Request, res: Response, error: PotentialErrors) => void;

export abstract class Provider<
	CustomRequestHandler extends RequestHandler = RequestHandler,
	CustomErrorHandler extends ErrorHandler<never> = ErrorHandler<never>
> {
	/**
	 * Middleware that processes the request and returns a `Promise<Express.User> | Express.User` or an `Error` object
	 */
	protected requestHandler: CustomRequestHandler;
	/**
	 * Handles custom errors returned by the requestHandler
	 */
	protected errorHandler?: CustomErrorHandler;

	constructor(requestHandler: CustomRequestHandler, errorHandler?: CustomErrorHandler | null) {
		this.requestHandler = requestHandler;
		if (errorHandler !== null) this.errorHandler = errorHandler;
	}

	/**
	 * Returns a user to be serialized and included in the `req` object as `req.user`
	 * (or returns undefined if the user should not be serialized nor set)
	 * 
	 * @param {Request} req
	 * @param {Response} res
	 * @param {NextFunction} next
	 * @returns {Express.User | Promise<Express.User> | undefined} the user to be saved
	 * and serialized, or undefined to indicate user should not be saved nor serialized
	 */
	public abstract process(
		req: Request,
		res: Response,
		next: NextFunction
	): Express.User | Promise<Express.User> | undefined;
}

export default Provider;
