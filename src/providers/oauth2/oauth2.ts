import axios from 'axios';

import Provider, { ErrorHandler } from '@/lib/Provider';

import type { Request, Response, NextFunction } from 'express';
import type { SessionData } from 'express-session';

interface Options {
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
    refresh_token: string,
	access_token: string,
	profile: Profile
) => NonNullable<SessionData['user'] | Promise<SessionData['user']>>;

class OAuth2Provider<Profile> extends Provider<Handler<Profile>> {
    private clientId: string;
    private clientSecret: string;
    private callbackURL: string;

    private authorizationURL: string;
    private tokenURL: string;
    private profileURL: string;

    private scope?: string[];

    private additionalAuthURLParameters?: Record<string, string>;

    constructor(options: Options, handler: Handler<Profile>, errorHandler?: ErrorHandler) {
        super(handler, errorHandler);

        this.clientId = options.clientId;
        this.clientSecret = options.clientSecret;

        this.authorizationURL = options.authorizationURL;
        this.tokenURL = options.tokenURL;
        this.callbackURL = options.callbackURL;
        this.profileURL = options.profileURL;
        this.scope = options.scope;

        this.additionalAuthURLParameters = options.additionalAuthorizationURLParameters;
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
        authorizationURLWithParameters.searchParams.append('approval_prompt', 'force');
        authorizationURLWithParameters.searchParams.append('access_type', 'offline');
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
        if (typeof code !== 'string')
            throw new Error('code for OAuth2 is undefined');

        try {
            // Obtain access token
            const { data } = await axios.post<{ refresh_token: string, access_token: string }>(this.tokenURL, {
                code: code,
                client_id: this.clientId,
                client_secret: this.clientSecret,
                redirect_uri: this.callbackURL,
                grant_type: 'authorization_code'
            }, {
                headers: { Accept: 'application/json' }
            });

            const { refresh_token, access_token } = data;

            // Use access token to fetch user profile
            const { data: profile } = await axios.get<Profile>(this.profileURL, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    Accept: 'application/json'
                }
            });

            const user = await this.handler(refresh_token, access_token, profile);
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
