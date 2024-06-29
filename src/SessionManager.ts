import type { Request } from 'express';

type UserSerializer<SerializedUser> = (user: Express.User) => SerializedUser;

class SessionManager<SerializedUser = unknown> {
	public async serializeAndSaveUser(
		req: Request,
		user: Express.User,
		userSerializer: UserSerializer<SerializedUser>
	) {
		if (!req.session) throw new Error('Login requires session support. Did you initialize express-session?');

		// Promisified req.session.regenerate
		await new Promise((resolve, reject) => {
			req.session.regenerate((err: Error) => {
				if (err) return reject(err);
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
				if (err) reject(new Error('There was an error while trying to save the session'));
				resolve(undefined);
			});
		});
	}

	public async deleteSerializedUser(req: Request) {
		if (!req.session) throw new Error('Login requires session support. Did you initialize express-session?');

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
}

export default SessionManager;
