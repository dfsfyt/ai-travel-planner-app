import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";
export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.dfsfyt.fan",
  projectId: "671141bc000a61c4d9f6",
  databaseId: "67114461001faccdc194",
  userCollectionId: "67114484001bdbf930ce",
  videosCollectionId: "671144a700040c0aaf40",
  storageId: "671146a400239a333cdd",
};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videosCollectionId,
  storageId,
} = config;

const client = new Client();

client
  .setEndpoint(endpoint)
  .setProject(projectId)
  .setPlatform(platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (userData: SignUpProps) => {
  try {
    const { email, password, username } = userData;
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw Error;
    const avatarUrl = avatars.getInitials(username);

    await signIn({ email, password });

    const newUser = await databases.createDocument(
      databaseId,
      userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const signIn = async ({ email, password }: SignInProps) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;
    const currentUser = await databases.listDocuments(
      databaseId,
      userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videosCollectionId
    );
    return posts.documents;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videosCollectionId,
      [Query.orderDesc('$createdAt'), Query.limit(7)]
    );
    return posts.documents;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const searchPosts = async (query: string) => {
    
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videosCollectionId,
      [Query.search('title', query)]
    );
    return posts.documents;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const getUserPosts = async (userId: string) => {
    
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videosCollectionId,
      [Query.equal('users', userId)]
    );
    return posts.documents;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const signOut = async () => {
    try {
        const session = await account.deleteSession('current')
        return session;
    } catch (error: any) {
        throw new Error(error)
    }
}