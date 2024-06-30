import { Request as GatekeeperRequest } from "@/lib/request"; 

declare global {
	namespace Express {
		interface Request extends GatekeeperRequest {}
	}
}
