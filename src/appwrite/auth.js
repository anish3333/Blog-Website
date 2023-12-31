import conf from "../conf/conf"
import {Client,Account, ID} from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client)
    }

    async createAccount({email, password, name}){
        try{
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount){
                return await this.login({email, password});
            }
            else{
                return userAccount;
            }
        }catch(error){
            console.log("Appwrite service :: createAccount :: error", error)
            alert(error);
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            console.log("Appwrite service :: login :: error", error)
            alert(error);
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logOut :: error", error)
        }
    }
}

//instance of the object that contains our auth services
const authService = new AuthService()

export default authService;