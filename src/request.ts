import SessionManager from "./SessionManager";

import type { Request as ExpressRequest } from "express";

export interface User {
	
}

export interface Request {
	user: Express.User;
	_sessionManager: SessionManager;

	logout: () => (void | Promise<void>);
	isAuthenticated: () => void;
	isUnauthenticated: () => void;
}

const req: Request = {
	user: {},
	_sessionManager: new SessionManager(),

	logout: () => {},
	isAuthenticated: () => {},
	isUnauthenticated: () => {}
};

/*
* Logs out user. NEEDS FOR req._sessionManager TO BE DEFINED
*/
req.logout = async function(this: ExpressRequest & { _sessionManager: SessionManager }) {
	await this._sessionManager.deleteSerializedUser(this);
};

export default req;
