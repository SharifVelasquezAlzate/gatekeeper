import Gatekeeper from "./lib/Gatekeeper";
import SessionManager from "./lib/SessionManager";

export interface User {}

const gatekeeper = new Gatekeeper(new SessionManager());
export default gatekeeper;
