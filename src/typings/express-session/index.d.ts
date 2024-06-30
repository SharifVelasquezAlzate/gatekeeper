import { GatekeeperSessionData } from "../../gatekeeper";
import { User as GatekeeperUser } from "../../request";

declare module 'express-session' {
	interface SessionData {
		gatekeeper: Partial<GatekeeperSessionData<unknown>>;
		user: GatekeeperUser | undefined;
	}
}

export {};
