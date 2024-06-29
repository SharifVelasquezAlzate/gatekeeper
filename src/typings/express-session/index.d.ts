import { GatekeeperSessionData } from "../..";

declare module 'express-session' {
	interface SessionData {
		gatekeeper: Partial<GatekeeperSessionData<unknown>>;
	}
}
