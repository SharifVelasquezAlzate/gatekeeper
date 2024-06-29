import type { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RequestHandler = (...args: any[]) => Express.User | Promise<Express.User> | Error;

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

	public abstract process(req: Request, res: Response, next: NextFunction): Express.User | Promise<Express.User>;
}

export default Provider;
