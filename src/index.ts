import Gatekeeper from "./lib/Gatekeeper";
import SessionManager from "./lib/SessionManager";

const gatekeeper = new Gatekeeper(new SessionManager());
export default gatekeeper;
