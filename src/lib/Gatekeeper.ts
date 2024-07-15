import Provider from './Provider';
import SessionManager from './SessionManager';
import mutatedReq, { type User } from './request';

import type { Request, Response, NextFunction } from 'express';

export type UserSerializer<SerializedUser> = (user: NonNullable<User>) => SerializedUser;
export type UserDeserializer<SerializedUser> = (
    serializedUser: SerializedUser
) => NonNullable<User> | Promise<NonNullable<User>>;

interface InitializeConfig<SerializedUser> {
    userSerializer: UserSerializer<SerializedUser>;
    userDeserializer: UserDeserializer<SerializedUser>;
}

class notInitializedError extends Error {
    constructor() {
        super('Gatekeeper has not been initialized. Remember to call gatekeeper.initialize() as an express middleware');
        this.name = this.constructor.name;
    }
}

class Gatekeeper<SerializedUser> {
    private sessionManager: SessionManager;
    private userSerializer?: UserSerializer<SerializedUser>;
    private userDeserializer?: UserDeserializer<SerializedUser>;

    constructor(sessionManager: SessionManager) {
        this.sessionManager = sessionManager;
    }

    public initialize(config: InitializeConfig<SerializedUser>) {
        this.userSerializer = config.userSerializer;
        this.userDeserializer = config.userDeserializer;

        const initializer = async function (
            this: Gatekeeper<SerializedUser>,
            req: Request,
            res: Response,
            next: NextFunction
        ) {
            req._sessionManager = this.sessionManager;

            req.logout = req.logout || mutatedReq.logout.bind(req);
            req.isAuthenticated = req.isAuthenticated || mutatedReq.isAuthenticated.bind(req);
            req.isUnauthenticated = req.isUnauthenticated || mutatedReq.isUnauthenticated.bind(req);

            await this.populateRequestWithUserFromSerializedUser(req);

            next();
        }.bind(this);

        // Do not return an async function in order to work with types required by Express middleware
        return function(this: Gatekeeper<SerializedUser>, req: Request, res: Response, next: NextFunction) {
            initializer(req, res, next).catch((error: unknown) => {
                next(error);
            });
        }.bind(this);
    }

    public authenticateWithProvider(provider: Provider<Record<string, unknown>>) {
        const authenticator = async function (
            this: Gatekeeper<SerializedUser>,
            req: Request,
            res: Response,
            next: NextFunction
        ) {
            this.ensureInitialized();

            const user = await provider.process(req, res, next);
            // We don't call next, as undefined/null means the Provider already did the error handling
            if (user === undefined || user === null) {
                await this.sessionManager.deleteSerializedUser(req);
                await this.populateRequestWithUserFromSerializedUser(req);
                return;
            }
            await this.sessionManager.serializeAndSaveUser(req, user, this.userSerializer!);
            await this.populateRequestWithUserFromSerializedUser(req);
            next();
        }.bind(this);

        // Do not return an async function in order to work with types required by Express middleware
        return function (this: Gatekeeper<SerializedUser>, req: Request, res: Response, next: NextFunction) {
            authenticator(req, res, next).catch((error: unknown) => {
                next(error);
            });
        }.bind(this);
    }

    public protect(failureHandler?: (req: Request, res: Response, next: NextFunction) => void) {
        return function protector(req: Request, res: Response, next: NextFunction) {
            if (req.isAuthenticated()) {
                next();
                return;
            }

            if (failureHandler !== undefined && failureHandler !== null) {
                if (typeof failureHandler !== 'function') {
                    throw new Error('failureHandler passed to gatekeeper.protect is not a function');
                }

                failureHandler(req, res, next);
                return;
            }

            res.sendStatus(401);
            return;
        };
    }

    private async populateRequestWithUserFromSerializedUser(req: Request) {
        this.ensureInitialized();

        const storedSerializedUser = req.session.gatekeeper?.serializedUser as SerializedUser;
        if (storedSerializedUser === null || storedSerializedUser === undefined) {
            await this.sessionManager.setUser(req, undefined);
            return;
        }

        const user = await this.userDeserializer!(storedSerializedUser);
        await this.sessionManager.setUser(req, user);
    }
    private ensureInitialized(this: Gatekeeper<SerializedUser>) {
        if (typeof this.userSerializer !== 'function') {
            throw new notInitializedError();
        }
        if (typeof this.userDeserializer !== 'function') {
            throw new notInitializedError();
        }
    }
}

export type GatekeeperSessionData<SerializedUser> = {
    serializedUser: SerializedUser;
} & {
    [key in `provider${string}`]: Record<string, string>;
};

export default Gatekeeper;
