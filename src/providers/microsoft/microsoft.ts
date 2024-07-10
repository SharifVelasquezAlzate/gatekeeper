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

type MicrosoftProfile = unknown;

class MicrosoftProvider extends OAuth2Provider<Options, MicrosoftProfile> {
    constructor(options: Options, handler: Handler<MicrosoftProfile>, errorHandler?: ErrorHandler) {
        super({
            clientId: options.clientId,
            clientSecret: options.clientSecret,
            callbackURL: options.callbackURL,

            authorizationURL: options.authorizationURL ?? 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
            tokenURL: options.tokenURL ?? 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
            profileURL: options.profileURL ?? 'https://graph.microsoft.com/v1.0/me',

            scope: options.scope ?? ['profile', 'email', 'User.Read'],
        }, handler, errorHandler);
    }
}

export default MicrosoftProvider;
