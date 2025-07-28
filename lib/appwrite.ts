import { Account, Client, Databases, ID, Storage } from "appwrite";
import Constants from "expo-constants";

const {
  appwriteEndpoint,
  appwriteProjectId,
  appwriteDatabaseId,
  appwriteCollectionVehiclesId,
  appwriteBucketVehicleImagesId,
} = Constants.expoConfig?.extra || {};

if (!appwriteEndpoint || !appwriteProjectId || !appwriteDatabaseId || !appwriteCollectionVehiclesId || !appwriteBucketVehicleImagesId) {
  throw new Error("Missing Appwrite environment variables.");
}

const client = new Client();
client.setEndpoint(appwriteEndpoint).setProject(appwriteProjectId);

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

export {
  account, appwriteBucketVehicleImagesId, appwriteCollectionVehiclesId, appwriteDatabaseId, client,
  databases, ID, storage
};

