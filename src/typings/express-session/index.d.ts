import { GatekeeperSessionData } from "../../gatekeeper";

declare module 'express-session' {
	interface SessionData {
		gatekeeper: Partial<GatekeeperSessionData<unknown>>;
	}
}

export {};
