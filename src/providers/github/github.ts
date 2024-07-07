import { ErrorHandler } from '@/lib/Provider';
import OAuth2Provider, { Handler } from '@/providers/oauth2';

interface Options {
	clientId: string;
	clientSecret: string;
	callbackURL: string;
	scope?: string[];

	githubAuthURL?: string;
	githubTokenURL?: string;
	githubProfileURL?: string;
}

interface GithubProfile {}

class GithubProvider extends OAuth2Provider<Options, GithubProfile> {
    constructor(options: Options, handler: Handler<GithubProfile>, errorHandler?: ErrorHandler) {
        super({
            clientId: options.clientId,
            clientSecret: options.clientSecret,
            callbackURL: options.callbackURL,
			
            authorizationURL: options.githubAuthURL ?? 'https://github.com/login/oauth/authorize',
            tokenURL: options.githubTokenURL ?? 'https://github.com/login/oauth/access_token',
            profileURL: options.githubProfileURL ?? 'https://api.github.com/user'
        }, handler, errorHandler);
    }
}

export default GithubProvider;
