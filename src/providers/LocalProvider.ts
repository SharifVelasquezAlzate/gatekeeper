import Provider, { ErrorHandler } from './Provider';

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

interface Options {
	failureRedirect: string
}

function createErrorHandlerFromOptions(options: Options): ErrorHandler | null {
	if (Object.keys(options).length <= 0) return null;

	return (error, req, res, next) => {
		if (options.failureRedirect) {
			res.redirect(301, options.failureRedirect);
		}
		next(error);
	};
}

class LocalProvider extends Provider<Handler> {
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

			this.errorHandler(error, req, res, next);
			return undefined;
		}
	}
}

export default LocalProvider;
