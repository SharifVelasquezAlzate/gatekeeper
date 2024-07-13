export class UserNotFound extends Error {
    constructor(message?: string) {
        super(message ?? 'User not found');
        this.name = this.constructor.name;
    }
}