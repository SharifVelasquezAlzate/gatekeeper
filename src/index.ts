import SessionManager from "./SessionManager";
import Gatekeeper from "./gatekeeper";

const gatekeeper = new Gatekeeper(new SessionManager());
export default gatekeeper;
