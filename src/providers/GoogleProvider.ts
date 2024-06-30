import axios from 'axios';
import { Request, Response, NextFunction } from 'express';

import Provider, { ErrorHandler as BaseErrorHandler } from './Provider';

interface Config {
	clientId: string;
	clientSecret: string;

	callbackURL: string;
	scope?: string[];
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

type Handler = (profile: GoogleProfile) => NonNullable<Express.User | Promise<Express.User>>;
type ErrorHandler = BaseErrorHandler<CodeMissing>;

class OAuth2Provider extends Provider<Handler, ErrorHandler> {
	private clientId: string;
	private clientSecret: string;
	private callbackURL: string;
	private scope: string[];
	
	private googleAuthURL: string;
	private googleTokenURL: string;
	private googleProfileURL: string;

	constructor(config: Config, handler: Handler, errorHandler?: ErrorHandler) {
		super(handler, errorHandler);

		this.clientId = config.clientId;
		this.clientSecret = config.clientSecret;
		this.callbackURL = config.callbackURL;
		this.scope = config.scope ?? ['profile'];

		this.googleAuthURL = this.generateAuthURL(this.clientId, this.callbackURL, this.scope);
		this.googleTokenURL = 'https://oauth2.googleapis.com/token';
		this.googleProfileURL = 'https://www.googleapis.com/oauth2/v3/userinfo';
	}

	public async process(req: Request, res: Response, next: NextFunction) {
		if (req.query?.code) {
			return await this.processCallback(req, res, next);
		} else {
			this.processFirstContact(req, res);
			// Since it is our first contact, we don't serialize nor save the user.
			return undefined;
		}
	}

	private processFirstContact(req: Request, res: Response) {
		res.redirect(this.googleAuthURL);
	}

	private async processCallback(req: Request, res: Response, next: NextFunction) {
		const { code } = req.query;

		if (typeof code !== 'string') {
			throw new Error('code for OAuth2 has a different type or is undefined');
		}

		const { data } = await axios.post<{ access_token: string }>(this.googleTokenURL, {
			code: code,
			client_id: this.clientId,
			client_secret: this.clientSecret,
			redirect_uri: this.callbackURL,
			grant_type: 'authorization_code'
		});

		const { access_token } = data;

		// Use access_token to fetch user profile
		const { data: profile } = await axios.get<GoogleProfile>(this.googleProfileURL, {
			headers: { Authorization: `Bearer ${access_token}` }
		});

		try {
			const user = await this.handler(profile);
			return user;
		} catch (error) {
			if (typeof this.errorHandler !== 'function') {
				next(error);
				return undefined;
			}

			// If not a GoogleProvider custom error, pass it on to Express to handle
			next(error);
			return undefined;
		}
	}

	private generateAuthURL(clientId: string, callbackURL: string, scope: string[]) {
		return 'https://accounts.google.com/o/oauth2/v2/auth?' +
				'client_id=' + clientId +
				'&redirect_uri=' + callbackURL +
				'&response_type=code' +
				'&scope=' + scope.join(' ');
	}
}

export default OAuth2Provider;
