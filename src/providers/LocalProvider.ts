import Provider, { ErrorHandler as BaseErrorHandler } from './Provider';

import type { Request, Response, NextFunction } from 'express';

type Handler = (
	username: unknown,
	password: unknown
) => NonNullable<Express.User | Promise<Express.User>>;

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

class LocalProvider extends Provider<Handler, ErrorHandler> {
	constructor(handler: Handler, errorHandlerOrOptions?: ErrorHandler | Options) {
		let errorHandler;
		let options;

		if (typeof errorHandlerOrOptions === 'function') {
			errorHandler = errorHandlerOrOptions;
		} else if (typeof errorHandlerOrOptions === 'object') {
			options = errorHandlerOrOptions;
			errorHandler = createErrorHandlerFromOptions(options);
		}

		super(handler, errorHandler);
	}

	public async process(req: Request, res: Response, next: NextFunction) {
		const { username, password } = req.body as Record<string, unknown>;

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

			if (error instanceof IncorrectCredentials) {
				this.errorHandler(req, res, error);
				return undefined;
			}

			// If not a LocalProvider custom error, pass it on to Express to handle
			next(error);
			return undefined;
		}
	}
}

export default LocalProvider;
