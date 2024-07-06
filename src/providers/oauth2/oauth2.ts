import axios from 'axios';

import Provider, { ErrorHandler } from '@/lib/Provider';

import type { Request, Response, NextFunction } from 'express';
import type { SessionData } from 'express-session';

interface Config {
	clientId: string;
	clientSecret: string;

	authorizationURL: string;
	tokenURL: string;
	callbackURL: string;
	profileURL: string;
	scope?: string[];

	additionalAuthorizationURLParameters?: Record<string, string>;
}

export type Handler<Profile> = (
	access_token: string,
	profile: Profile
) => NonNullable<SessionData['user'] | Promise<SessionData['user']>>;

class OAuth2Provider<Profile> extends Provider<Handler<Profile>> {
    public defaultName = 'oauth2';

    private clientId: string;
    private clientSecret: string;
    private callbackURL: string;

    private authorizationURL: string;
    private tokenURL: string;
    private profileURL: string;

    private scope?: string[];

    private additionalAuthURLParameters?: Record<string, string>;

    constructor(config: Config, handler: Handler<Profile>, errorHandler?: ErrorHandler) {
        super(handler, errorHandler);

        this.clientId = config.clientId;
        this.clientSecret = config.clientSecret;

        this.authorizationURL = config.authorizationURL;
        this.tokenURL = config.tokenURL;
        this.callbackURL = config.callbackURL;
        this.profileURL = config.profileURL;
        this.scope = config.scope;

        this.additionalAuthURLParameters = config.additionalAuthorizationURLParameters;
    }

    public async process(req: Request, res: Response, next: NextFunction) {
        if (req.query?.code) {
            return await this.processCallback(req, res, next);
        } else {
            this.processFirstContact(req, res);
            return undefined;
        }
    }

    public processFirstContact(req: Request, res: Response) {
        const authorizationURLWithParameters = new URL(this.authorizationURL);
        authorizationURLWithParameters.searchParams.append('client_id', this.clientId);
        authorizationURLWithParameters.searchParams.append('redirect_uri', this.callbackURL);
        authorizationURLWithParameters.searchParams.append('response_type', 'code');
        if (this.scope !== undefined && this.scope !== null) {
            authorizationURLWithParameters.searchParams.append('scope', this.scope?.join(' '));
        }
        if (
            this.additionalAuthURLParameters !== undefined &&
			this.additionalAuthURLParameters !== null &&
			typeof this.additionalAuthURLParameters === 'object'
        ) {
            for (const param in this.additionalAuthURLParameters) {
                authorizationURLWithParameters.searchParams.append(param, this.additionalAuthURLParameters[param]);
            }
        }

        res.redirect(authorizationURLWithParameters.toString());
    }

    public async processCallback(req: Request, res: Response, next: NextFunction) {
        const { code } = req.query;
        if (typeof code !== 'string') {
            throw new Error('code for OAuth2 is undefined');
        }

        // Obtain access token
        const { data } = await axios.post<{ access_token: string }>(this.tokenURL, {
            code: code,
            client_id: this.clientId,
            client_secret: this.clientSecret,
            redirect_uri: this.callbackURL,
            grant_type: 'authorization_code'
        }, {
            headers: { Accept: 'application/json' }
        });
        const { access_token } = data;

        // Use access token to fetch user profile
        const { data: profile } = await axios.get<Profile>(this.profileURL, {
            headers: {
                Authorization: `Bearer ${access_token}`,
                Accept: 'application/json'
            }
        });

        try {
            const user = await this.handler(access_token, profile);
            return user;
        } catch (error) {
            if (typeof this.errorHandler !== 'function') {
                next(error);
                return undefined;
            }
            this.errorHandler(error, req, res, next);
            return undefined;
        }
    }
}

export default OAuth2Provider;
