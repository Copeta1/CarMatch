import Constants from "expo-constants";
import { Account, Client, Databases, ID, Storage, } from "react-native-appwrite";

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
  account, appwriteBucketVehicleImagesId, appwriteCollectionVehiclesId, appwriteDatabaseId, appwriteProjectId, client,
  databases, ID, storage
};

