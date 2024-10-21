import { CreateVideoFormProps } from "@/types/interface";
import { ImagePickerAsset } from "expo-image-picker";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  ImageGravity,
  Query,
  Storage
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
const storage = new Storage(client);

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
      videosCollectionId,
      [Query.orderDesc('$createdAt')]
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

export const getFilePreview = (fileId: string, type: string) => {
    let fileUrl;
    try {
        if(type === 'video') {
            fileUrl = storage.getFileView(storageId, fileId)
        } else if(type === 'image') {
            fileUrl = storage.getFilePreview(storageId, fileId, 2000, 2000, ImageGravity.Top, 100)
        } else {
            throw new Error("Invalid file type")
        }
        if(!fileUrl) throw Error
        return fileUrl;
    } catch (error: any) {
        throw new Error(error)
    }
}

export const uploadFile = async (file: ImagePickerAsset | null, type: string) => {
    if(!file) return;
    const asset: any = {
        type: file.type,
        size: file.fileSize,
        uri: file.uri,
        name: file.fileName
    }
    try {
        const uploadFile = await storage.createFile(
            storageId,
            ID.unique(),
            asset
        )
        const fileUrl = await getFilePreview(uploadFile.$id, type)
        return fileUrl;
    } catch (error: any) {
        throw new Error(error)
    }
}
export const createVideo = async (form: CreateVideoFormProps) => {
    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, 'image'),
            uploadFile(form.video, 'video'),
        ])

        const newPost = await databases.createDocument(
            databaseId, 
            videosCollectionId, 
            ID.unique(), 
            {
                title: form.title,
                thumbnail: thumbnailUrl,
                video: videoUrl,
                prompt: form.prompt,
                creator: form.userId
            }
        )

        return newPost;
    } catch (error: any) {
        throw new Error(error)
    }
}