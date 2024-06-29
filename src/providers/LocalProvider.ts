import Provider, { ErrorHandler as BaseErrorHandler } from './Provider';

import type { Request, Response, NextFunction } from 'express';

type RequestHandler = (
	username: unknown,
	password: unknown
) => Express.User | Promise<Express.User> | Error;

export class IncorrectCredentials extends Error {
	constructor(message: string) {
		super(message);
		this.name = this.constructor.name;
	}
}
type ErrorHandler = BaseErrorHandler<IncorrectCredentials>;

interface Options {
	failureRedirect: string
}

function createErrorHandlerFromOptions(options: Options): ErrorHandler | null {
	if (Object.keys(options).length <= 0) return null;

	return (req, res) => {
		if (options.failureRedirect) {
			res.redirect(301, options.failureRedirect);
		}
	};
}

class LocalProvider extends Provider<RequestHandler, ErrorHandler> {
	constructor(requestHandler: RequestHandler, errorHandlerOrOptions?: ErrorHandler | Options) {
		let errorHandler;
		let options;

		if (typeof errorHandlerOrOptions === 'function') {
			errorHandler = errorHandlerOrOptions;
		} else if (typeof errorHandlerOrOptions === 'object') {
			options = errorHandlerOrOptions;
			errorHandler = createErrorHandlerFromOptions(options);
		}

		super(requestHandler, errorHandler);
	}

	public async process(req: Request, res: Response, next: NextFunction) {
		const { username, password } = req.body as Record<string, unknown>;

		const requestHandlerResult = await this.requestHandler(username, password);

		if (requestHandlerResult instanceof Error) {
			const error = requestHandlerResult;

			// In case there's no error handler defined, pass it on to Express
			if (typeof this.errorHandler !== 'function') {
				return next(error);
			}

			if (error instanceof IncorrectCredentials) {
				this.errorHandler(req, res, error);
			}

			// If not a LocalProvider custom error, pass it on to Express to handle
			return next(error);
		}


		const processedUser = requestHandlerResult;
		return processedUser;
	}
}

export default LocalProvider;
