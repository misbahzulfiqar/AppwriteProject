import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";

console.log("Loaded URL:", conf.appwriteUrl);

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    // Create a new user account and log in
async login({ email, password }) {
    try {
        return await this.account.createEmailPasswordSession(email, password);
    } catch (err) {
        console.error("Login failed:", err);
        return null; // prevents freezing
    }
}

async getCurrentUser() {
    try {
        return await this.account.get();
    } catch (err) {
        console.error("GetCurrentUser failed:", err);
        return null; // prevents freezing
    }
}

    // Log out user
    async logout() {
        return this.account.deleteSessions();
    }
}

const authService = new AuthService();

export default authService;

