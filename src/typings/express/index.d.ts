import { Request as GatekeeperRequest } from "../../request"; 

declare global {
	namespace Express {
		interface Request extends GatekeeperRequest {}
	}
}
