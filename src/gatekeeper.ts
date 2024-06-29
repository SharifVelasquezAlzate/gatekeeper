import SessionManager from './SessionManager';
import Provider from './providers/Provider';
import mutatedReq from './request';

import type { Request, Response, NextFunction } from 'express';

export type UserSerializer<SerializedUser> = (user: Express.User) => SerializedUser;
export type UserDeserializer<SerializedUser> = (serializedUser: SerializedUser) => Express.User;

class Gatekeeper<SerializedUser> {
	private sessionManager: SessionManager;
	private userSerializer: UserSerializer<SerializedUser>;
	private userDeserializer: UserDeserializer<SerializedUser>;

	private providers: Record<string, Provider> = {};

	constructor(
		sessionManager: SessionManager,
		userSerializer: UserSerializer<SerializedUser>,
		userDeserializer: UserDeserializer<SerializedUser>
	) {
		this.sessionManager = sessionManager;
		this.userSerializer = userSerializer;
		this.userDeserializer = userDeserializer;
	}

	public initialize() {		
		return (function (this: Gatekeeper<SerializedUser>, req: Request, res: Response, next: NextFunction) {
			req._sessionManager = this.sessionManager;

			req.logout = req.logout || mutatedReq.logout.bind(req);
			req.isAuthenticated = req.isAuthenticated || mutatedReq.isAuthenticated.bind(req);
			req.isUnauthenticated = req.isUnauthenticated || mutatedReq.isUnauthenticated.bind(req);

			this.populateRequestWithUserFromSerializedUser(req);

			next();
		}).bind(this);
	}

	public registerProvider(name: string, provider: Provider) {
		this.providers[name] = provider;
	}

	public authenticateWithProviderName(providerName: string) {
		return (async function (this: Gatekeeper<SerializedUser>, req: Request, res: Response, next: NextFunction) {
			const storedSerializedUser = req.session.gatekeeper?.serializedUser;

			if (storedSerializedUser != null) {
				this.populateRequestWithUserFromSerializedUser(req);
				next();
				return;
			}

			const user = await this.providers[providerName].process(req, res, next);
			// If user is undefined, it means it should not be serialized
			if (user === undefined) {
				req.user = undefined;
				await this.sessionManager.deleteSerializedUser(req);
				return;
			}
			req.user = user;
			await this.sessionManager.serializeAndSaveUser(req, user, this.userSerializer);
			next();
		}).bind(this);
	}

	private populateRequestWithUserFromSerializedUser(req: Request) {
		const storedSerializedUser = req.session.gatekeeper?.serializedUser as SerializedUser;
		if (storedSerializedUser === null || storedSerializedUser === undefined) {
			req.user = undefined;
			return;
		}

		const user = this.userDeserializer(storedSerializedUser);
		req.user = user;
	}
}

export interface GatekeeperSessionData<SerializedUser> {
	serializedUser: SerializedUser;
}

export default Gatekeeper;
