import { GatekeeperSessionData } from "../../lib/Gatekeeper";
import { User as GatekeeperUser } from "../../lib/request";

declare module 'express-session' {
	interface SessionData {
		gatekeeper: Partial<GatekeeperSessionData<unknown>>;
		user: GatekeeperUser | undefined;
	}
}

export {};
