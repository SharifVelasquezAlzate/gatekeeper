import { Request as GatekeeperRequest } from "../../request"; 
import { User as GatekeeperUser } from "../../request";

declare global {
	namespace Express {
		interface Request extends GatekeeperRequest {}
		type User = GatekeeperUser | undefined;
	}
}
