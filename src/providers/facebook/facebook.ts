import { ErrorHandler } from "@/lib/Provider";
import OAuth2Provider, { Handler } from "@/providers/oauth2";

interface FacebookProfile {

}

interface Options {
	clientId: string;
	clientSecret: string;
	callbackURL: string;
	scope?: string[];

	facebookAuthURL?: string;
	facebookTokenURL?: string;
	facebookProfileURL?: string;
}


class FacebookProvider extends OAuth2Provider<FacebookProfile> {
    constructor(options: Options, handler: Handler<FacebookProfile>, errorHandler?: ErrorHandler) {
        super({
            clientId: options.clientId,
            clientSecret: options.clientSecret,
            callbackURL: options.callbackURL,
			
            scope: options.scope ?? ['profile'],

            authorizationURL: options.facebookAuthURL ?? 'https://www.facebook.com/v20.0/dialog/oauth',
            tokenURL: options.facebookTokenURL ?? 'https://graph.facebook.com/v20.0/oauth/access_token',
            profileURL: options.facebookProfileURL ?? 'https://graph.facebook.com/me'
        }, handler, errorHandler);
    }
}

export default FacebookProvider;
