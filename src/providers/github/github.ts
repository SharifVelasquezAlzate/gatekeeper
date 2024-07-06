import { ErrorHandler } from '@/lib/Provider';
import OAuth2Provider, { Handler } from '@/providers/oauth2';

interface Config {
	clientId: string;
	clientSecret: string;
	callbackURL: string;
	scope?: string[];

	githubAuthURL?: string;
	githubTokenURL?: string;
	githubProfileURL?: string;
}

interface GithubProfile {}

class GithubProvider extends OAuth2Provider<GithubProfile> {
    constructor(config: Config, handler: Handler<GithubProfile>, errorHandler?: ErrorHandler) {
        super({
            clientId: config.clientId,
            clientSecret: config.clientSecret,
            callbackURL: config.callbackURL,
			
            authorizationURL: config.githubAuthURL ?? 'https://github.com/login/oauth/authorize',
            tokenURL: config.githubTokenURL ?? 'https://github.com/login/oauth/access_token',
            profileURL: config.githubProfileURL ?? 'https://api.github.com/user'
        }, handler, errorHandler);
    }
}

export default GithubProvider;
