import { Account, Client, Databases, ID, Storage } from "appwrite";
import Constants from "expo-constants";

const endpoint = Constants.expoConfig?.extra?.appwriteEndpoint;
const projectId = Constants.expoConfig?.extra?.appwriteProjectId;

if (!endpoint || !projectId) {
  throw new Error("Missing Appwrite environment variables.");
}

const client = new Client();
client.setEndpoint(endpoint).setProject(projectId);

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);


export { account, client, databases, ID, storage };

