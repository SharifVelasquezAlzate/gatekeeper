import { ErrorHandler } from "@/lib/Provider";
import OAuth2Provider, { Handler } from "@/providers/oauth2";

interface Options {
    clientId: string;
    clientSecret: string;
    callbackURL: string;

    authorizationURL?: string;
    tokenURL?: string;
    profileURL?: string; 

    scope?: string[];
}
interface LinkedinProfile {
    id: string;
}

class LinkedinProvider extends OAuth2Provider<LinkedinProfile> {
    constructor(options: Options, handler: Handler<LinkedinProfile>, errorHandler?: ErrorHandler) {
        super({
            clientId: options.clientId,
            clientSecret: options.clientSecret,
            callbackURL: options.callbackURL,

            authorizationURL: options.authorizationURL ?? 'https://www.linkedin.com/oauth/v2/authorization',
            tokenURL: options.tokenURL ?? 'https://www.linkedin.com/oauth/v2/accessToken',
            profileURL: options.profileURL ?? 'https://api.linkedin.com/v2/userinfo',

            scope: options.scope ?? ['profile', 'email'],
        }, handler, errorHandler);
    }
}

export default LinkedinProvider;
