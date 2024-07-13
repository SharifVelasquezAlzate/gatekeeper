export class IncorrectCredentials extends Error {
    constructor(message?: string) {
        super(message ?? 'Incorrect Credentials');
        this.name = this.constructor.name;
    }
}