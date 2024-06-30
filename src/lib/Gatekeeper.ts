import Provider from './Provider';
import SessionManager from './SessionManager';
import mutatedReq from './request';

import type { Request, Response, NextFunction } from 'express';
import type { SessionData } from 'express-session';

export type UserSerializer<SerializedUser> = (user: SessionData['user']) => SerializedUser;
export type UserDeserializer<SerializedUser> = (serializedUser: SerializedUser) => SessionData['user'];

interface InitializeConfig<SerializedUser> {
	userSerializer: UserSerializer<SerializedUser>,
	userDeserializer: UserDeserializer<SerializedUser>
}

const notInitializedError = new Error(
	'Gatekeeper has not been initialized. Remember to call gatekeeper.initialize() as an express middleware'
);

class Gatekeeper<SerializedUser> {
	private sessionManager: SessionManager;
	private userSerializer?: UserSerializer<SerializedUser>;
	private userDeserializer?: UserDeserializer<SerializedUser>;

	private providers: Record<string, Provider> = {};

	constructor(sessionManager: SessionManager) {
		this.sessionManager = sessionManager;
	}

	public initialize(config: InitializeConfig<SerializedUser>) {
		this.userSerializer = config.userSerializer;
		this.userDeserializer = config.userDeserializer;

		return async function (this: Gatekeeper<SerializedUser>, req: Request, res: Response, next: NextFunction) {
			req._sessionManager = this.sessionManager;

			req.logout = req.logout || mutatedReq.logout.bind(req);
			req.isAuthenticated = req.isAuthenticated || mutatedReq.isAuthenticated.bind(req);
			req.isUnauthenticated = req.isUnauthenticated || mutatedReq.isUnauthenticated.bind(req);

			await this.populateRequestWithUserFromSerializedUser(req);

			next();
		}.bind(this);
	}

	public registerProvider(name: string, provider: Provider) {
		this.providers[name] = provider;
	}

	public authenticateWithProviderName(providerName: string) {
		this.ensureInitialized();

		return async function (this: Gatekeeper<SerializedUser>, req: Request, res: Response, next: NextFunction) {
			const storedSerializedUser = req.session.gatekeeper?.serializedUser;

			if (storedSerializedUser !== null && storedSerializedUser !== undefined) {
				await this.populateRequestWithUserFromSerializedUser(req);
				next();
				return;
			}

			const user = await this.providers[providerName].process(req, res, next);
			// We don't call next, as undefined means the Provider already did the error handling
			if (user === undefined) {
				await this.sessionManager.setUser(req, undefined);
				await this.sessionManager.deleteSerializedUser(req);
				return;
			}
			await this.sessionManager.setUser(req, user);
			await this.sessionManager.serializeAndSaveUser(req, user, this.userSerializer!);
			next();
		}.bind(this);
	}

	private async populateRequestWithUserFromSerializedUser(req: Request) {
		this.ensureInitialized();

		const storedSerializedUser = req.session.gatekeeper?.serializedUser as SerializedUser;
		if (storedSerializedUser === null || storedSerializedUser === undefined) {
			await this.sessionManager.setUser(req, undefined);
			return;
		}

		const user = this.userDeserializer!(storedSerializedUser);
		await this.sessionManager.setUser(req, user);
	}

	//
	private ensureInitialized(this: Gatekeeper<SerializedUser>) {
		if (typeof this.userSerializer !== 'function') {
			throw notInitializedError;
		}
		if (typeof this.userDeserializer !== 'function') {
			throw notInitializedError;
		}
	}
}

export interface GatekeeperSessionData<SerializedUser> {
	serializedUser: SerializedUser;
}

export default Gatekeeper;
