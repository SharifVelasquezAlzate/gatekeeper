import axios from 'axios';
import crypto from 'crypto';

import Provider, { ErrorHandler } from '@/lib/Provider';

import type { User } from '@/lib/request';
import type { Request, Response, NextFunction } from 'express';

interface Options {
    clientId: string;
    clientSecret: string;

    authorizationURL: string;
    tokenURL: string;
    callbackURL: string;
    profileURL: string;
	  scope?: string[];

    tokenGrantType?: string;
    tokenRequestContentType?: 'application/json' | 'application/x-www-form-urlencoded';
    additionalAuthorizationURLParameters?: Record<string, string>;

    // Options to enable or disable features
    useOAuthState?: boolean
}

export type Handler<Profile> = (
    refresh_token: string | undefined,
    access_token: string,
    profile: Profile
) => NonNullable<User> | Promise<NonNullable<User>>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
class OAuth2Provider<ProviderOptions extends Record<string, any>, Profile> extends Provider<
    ProviderOptions,
    Handler<Profile>
> {
    private clientId: string;
    private clientSecret: string;
    private callbackURL: string;

    private authorizationURL: string;
    private tokenURL: string;
    private profileURL: string;

    private scope?: string[];

    private tokenGrantType: string;
    private tokenRequestContentType?: 'application/json' | 'application/x-www-form-urlencoded';
    private additionalAuthURLParameters?: Record<string, string>;

    // Options to enable or disable features
    private useOAuthState: boolean;

    constructor(options: Options, handler: Handler<Profile>, errorHandler?: ErrorHandler) {
        super(handler, errorHandler);

        this.clientId = options.clientId;
        this.clientSecret = options.clientSecret;

        this.authorizationURL = options.authorizationURL;
        this.tokenURL = options.tokenURL;
        this.callbackURL = options.callbackURL;
        this.profileURL = options.profileURL;

        this.scope = options.scope;

        this.tokenGrantType = options.tokenGrantType ?? 'authorization_code';
        this.tokenRequestContentType = options.tokenRequestContentType ?? 'application/x-www-form-urlencoded';
        this.additionalAuthURLParameters = options.additionalAuthorizationURLParameters;

        this.useOAuthState = options.useOAuthState ?? true;
    }

    public async process(req: Request, res: Response, next: NextFunction) {
        if (req.query?.code) {
            return await this.processCallback(req, res, next);
        } else {
            await this.processFirstContact(req, res);
            return undefined;
        }
    }

    public async processFirstContact(req: Request, res: Response) {
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

        if (this.useOAuthState) {
            // The answer to life... It is always 42 :)
            const state = crypto.randomBytes(42).toString('hex');

            await req._sessionManager.saveDataInProviderSpace(req, 'oauth2', { state: state });
            authorizationURLWithParameters.searchParams.append('state', state);
        }
    
        res.redirect(authorizationURLWithParameters.toString());
    }

    public async processCallback(req: Request, res: Response, next: NextFunction) {
        const { code, state } = req.query;
        const dataStoredInFirstContact = req._sessionManager.getDataFromProviderSpace(req, 'oauth2');
        const stateFromSession = dataStoredInFirstContact?.state;

        if (typeof code !== 'string')
            throw new Error('code for OAuth2 is undefined');
        if (this.useOAuthState && stateFromSession == undefined)
            throw new Error('internal OAuth2 state is undefined');
        if (this.useOAuthState && state != undefined && stateFromSession !== state)
            throw new Error('state is not the same.');

        try {
            // Obtain access token
            let tokenRequestBody: Record<string, string> | URLSearchParams = {
                code: code,
                client_id: this.clientId,
                client_secret: this.clientSecret,
                redirect_uri: this.callbackURL,
                grant_type: this.tokenGrantType
            };

            if (this.tokenRequestContentType === 'application/x-www-form-urlencoded') {
                tokenRequestBody = new URLSearchParams(tokenRequestBody);
            }

            const { data } = await axios.post<{
                refresh_token?: string;
                access_token: string;
            }>(this.tokenURL, tokenRequestBody, {
                headers: {
                    'Content-Type': this.tokenRequestContentType,
                    Accept: 'application/json'
                }
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
