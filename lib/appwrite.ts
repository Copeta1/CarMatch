import { Account, Client, ID } from "appwrite";
import Constants from "expo-constants";

// Get variables from Expo config
const endpoint = Constants.expoConfig?.extra?.appwriteEndpoint;
const projectId = Constants.expoConfig?.extra?.appwriteProjectId;

if (!endpoint || !projectId) {
  throw new Error("Missing Appwrite environment variables.");
}

const client = new Client();
client
  .setEndpoint(endpoint)
  .setProject(projectId);

const account = new Account(client);

export { account, ID };
