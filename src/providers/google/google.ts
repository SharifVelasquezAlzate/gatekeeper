import  { ErrorHandler } from '@/lib/Provider';
import OAuth2Provider, { Handler } from '@/providers/oauth2';


interface Config {
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
    constructor(config: Config, handler: Handler<GoogleProfile>, errorHandler?: ErrorHandler) {
        super({
            clientId: config.clientId,
            clientSecret: config.clientSecret,
            callbackURL: config.callbackURL,
			
            scope: config.scope ?? ['profile'],

            authorizationURL: config.googleAuthURL ?? 'https://accounts.google.com/o/oauth2/v2/auth',
            tokenURL: config.googleTokenURL ?? 'https://oauth2.googleapis.com/token',
            profileURL: config.googleProfileURL ?? 'https://www.googleapis.com/oauth2/v3/userinfo'
        }, handler, errorHandler);
    }
}

export default GoogleProvider;
