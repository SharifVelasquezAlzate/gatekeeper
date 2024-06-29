import type { Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BaseHandler = (...args: any[]) => Promise<Express.User>;

export abstract class Provider<Handler extends BaseHandler = BaseHandler> {
	// Processes request and returns user
	protected handler: Handler;

	constructor(handler: Handler) {
		this.handler = handler;
	}

	public abstract process(req: Request, res: Response): Express.User | Promise<Express.User>;
}

export default Provider;
