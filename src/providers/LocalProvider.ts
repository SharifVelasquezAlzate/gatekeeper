import Provider from "./Provider";

import type { Request } from 'express';

type Handler = (username: string | null, password: string | null) => Promise<Express.User>;

class LocalProvider extends Provider<Handler> {
	public async process(req: Request) {
		const { username, password } = req.body as Record<string, unknown>;
		
		if (typeof username !== 'string' || typeof password !== 'string') {
			throw new Error('username or password have the wrong type or are undefined');
		}

		const processedUser = await this.handler(username, password);
		return processedUser;
	}
}

export default LocalProvider;
