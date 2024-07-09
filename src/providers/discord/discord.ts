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

type DiscordProfile = unknown;

class DiscordProvider extends OAuth2Provider<DiscordProfile> {
    constructor(options: Options, handler: Handler<DiscordProfile>, errorHandler?: ErrorHandler) {
        super({
            clientId: options.clientId,
            clientSecret: options.clientSecret,
            callbackURL: options.callbackURL,

            authorizationURL: options.authorizationURL ?? 'https://discord.com/oauth2/authorize',
            tokenURL: options.tokenURL ?? 'https://discord.com/api/v10/oauth2/token',
            profileURL: options.profileURL ?? 'https://discordapp.com/api/users/@me',

            scope: options.scope ?? ['identify', 'email'],
        }, handler, errorHandler);
    }
}

export default DiscordProvider;
