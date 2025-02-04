import type { UserSerializer } from './Gatekeeper';
import type { User } from './request';
import type { Request } from 'express';

async function regenerateSession(req: Request) {
    const previousSession = req.session;

    await new Promise((resolve, reject) => {
        req.session.regenerate((err: Error | undefined) => {
            if (err) {
                reject(err);
                return;
            }

            // We keep the information present in the previous session
            Object.assign(req.session, {...previousSession, ...req.session});
            resolve(undefined);
        });
    });
}

async function saveSession(req: Request) {
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

class SessionManager<SerializedUser = unknown> {
    public async setUser(req: Request, user: User | undefined) {
        this.ensureRequirements(req);

        req.session.user = user;

        await saveSession(req);		
    }

    public async serializeAndSaveUser(
        req: Request,
        user: NonNullable<User>,
        userSerializer: UserSerializer<SerializedUser>
    ) {
        this.ensureRequirements(req);

        await regenerateSession(req);

        if (!req.session.gatekeeper) {
            req.session.gatekeeper = {};
        }

        req.session.gatekeeper.serializedUser = userSerializer(user);

        await saveSession(req);
    }

    public async deleteSerializedUser(req: Request) {
        this.ensureRequirements(req);

        if (req.session.gatekeeper) {
            delete req.session.gatekeeper.serializedUser;
        }

        // Promisified req.session.save
        await saveSession(req);
    }

    public async saveDataInProviderSpace(req: Request, providerId: string, data: Record<string, string>) {
        this.ensureRequirements(req);

        if (!req.session.gatekeeper) {
            req.session.gatekeeper = {};
        } if (!(`provider${providerId}` in req.session.gatekeeper)) {
            req.session.gatekeeper[`provider${providerId}`] = data;
        }

        req.session.gatekeeper[`provider${providerId}`] = data;

        await saveSession(req);
    }

    public getDataFromProviderSpace(req: Request, providerId: string) {
        this.ensureRequirements(req);

        if (!req.session.gatekeeper) return undefined;
        if (!(`provider${providerId}` in req.session.gatekeeper)) return undefined;

        return req.session.gatekeeper[`provider${providerId}`];
    }

    private ensureRequirements(req: Request) {
        if (req.session === undefined || req.session === undefined) {
            throw new Error('Login requires session support. Did you initialize your session middleware?');
        }
    }
}

export default SessionManager;
