import SessionManager from "./SessionManager";
import Gatekeeper, { UserSerializer, UserDeserializer } from "./gatekeeper";
import LocalProviderPriv from "./providers/LocalProvider";

interface Options<SerializedUser> {
	userSerializer: UserSerializer<SerializedUser>,
	userDeserializer: UserDeserializer<SerializedUser>
}

export default function getGatekeeper<SerializedUser>(options: Options<SerializedUser>) {
	const sessionManager = new SessionManager();
	const gatekeeper = new Gatekeeper(sessionManager, options.userSerializer, options.userDeserializer);

	return gatekeeper;
}

export const LocalProvider = LocalProviderPriv;
