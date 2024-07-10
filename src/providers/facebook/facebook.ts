import OAuth2Provider, { type Handler } from "@/providers/oauth2";

import type { ErrorHandler } from "@/lib/Provider";

interface Options {
    clientId: string;
    clientSecret: string;
    callbackURL: string;

    authorizationURL?: string;
    tokenURL?: string;
    profileURL?: string;

    scope?: string[];
}

type FacebookProfile = unknown;

class FacebookProvider extends OAuth2Provider<Options, FacebookProfile> {
    constructor(options: Options, handler: Handler<FacebookProfile>, errorHandler?: ErrorHandler) {
        super({
            clientId: options.clientId,
            clientSecret: options.clientSecret,
            callbackURL: options.callbackURL,

            authorizationURL: options.authorizationURL ?? 'https://www.facebook.com/v20.0/dialog/oauth',
            tokenURL: options.tokenURL ?? 'https://graph.facebook.com/v20.0/oauth/access_token',
            profileURL: options.profileURL ?? 'https://graph.facebook.com/me',

            scope: options.scope ?? ['public_profile', 'email'],
        }, handler, errorHandler);
    }
}

export default FacebookProvider;
