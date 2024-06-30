import SessionManager from "./SessionManager";

import type { Request as ExpressRequest } from "express";
import type { SessionData } from "express-session";

export interface User {
	
}

export interface Request {
	user: SessionData['user'];
	_sessionManager: SessionManager;

	logout: () => (void | Promise<void>);
	isAuthenticated: () => boolean;
	isUnauthenticated: () => boolean;
}

const req: Request = {
	user: {},
	_sessionManager: new SessionManager(),

	/*
	* Logs out user.
	*
	* REQUIRES: req._sessionManager to be defined
	*/
	logout: async function(this: ExpressRequest & { _sessionManager: SessionManager }) {
		await this._sessionManager.deleteSerializedUser(this);
	},

	isAuthenticated: function(this: ExpressRequest) {
		return this.session.user !== undefined && this.session.user !== null;
	},

	isUnauthenticated: function(this: ExpressRequest) {
		return this.isAuthenticated();
	}
};

export default req;
