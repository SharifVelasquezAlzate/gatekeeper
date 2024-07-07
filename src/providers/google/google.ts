import  { ErrorHandler } from '@/lib/Provider';
import OAuth2Provider, { Handler } from '@/providers/oauth2';


interface Options {
	clientId: string;
	clientSecret: string;
	callbackURL: string;
	scope?: string[];

	googleAuthURL?: string;
	googleTokenURL?: string;
	googleProfileURL?: string;
}

interface GoogleProfile {
	id: string;
}

export class CodeMissing extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

class GoogleProvider extends OAuth2Provider<GoogleProfile> {
    constructor(options: Options, handler: Handler<GoogleProfile>, errorHandler?: ErrorHandler) {
        super({
            clientId: options.clientId,
            clientSecret: options.clientSecret,
            callbackURL: options.callbackURL,
			
            scope: options.scope ?? ['profile'],

            authorizationURL: options.googleAuthURL ?? 'https://accounts.google.com/o/oauth2/v2/auth',
            tokenURL: options.googleTokenURL ?? 'https://oauth2.googleapis.com/token',
            profileURL: options.googleProfileURL ?? 'https://www.googleapis.com/oauth2/v3/userinfo'
        }, handler, errorHandler);
    }
}

export default GoogleProvider;
