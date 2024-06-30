import type { Request } from 'express';
import type { SessionData } from 'express-session';

type UserSerializer<SerializedUser> = (user: SessionData['user']) => SerializedUser;

class SessionManager<SerializedUser = unknown> {
	public setUser(req: Request, user: SessionData['user'] | undefined) {
		this.ensureRequirements(req);
		req.session.user = user;
	}

	public async serializeAndSaveUser(
		req: Request,
		user: SessionData['user'],
		userSerializer: UserSerializer<SerializedUser>
	) {
		this.ensureRequirements(req);

		// Promisified req.session.regenerate
		await new Promise((resolve, reject) => {
			req.session.regenerate((err: Error | undefined) => {
				if (err) {
					reject(err);
					return;
				}
				resolve(undefined);
			});
		});

		if (!req.session.gatekeeper) {
			req.session.gatekeeper = {};
		}

		req.session.gatekeeper.serializedUser = userSerializer(user);

		// Promisified req.session.save
		await new Promise((resolve, reject) => {
			req.session.save((err) => {
				if (err) {
					reject(new Error('There was an error while trying to save the session'));
					return;
				}
				resolve(undefined);
			});
		});
	}

	public async deleteSerializedUser(req: Request) {
		this.ensureRequirements(req);

		if (req.session.gatekeeper) {
			delete req.session.gatekeeper.serializedUser;
		}

		await new Promise((resolve, reject) => {
			req.session.save((err: Error) => {
				if (err) reject(err);
				resolve(undefined);
			});
		});
	}

	private ensureRequirements(req: Request) {
		if (req.session === undefined || req.session === undefined) {
			throw new Error('Login requires session support. Did you initialize your session middleware?');
		}
	}
}

export default SessionManager;
