// const conf = {
//     appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
//     appwriteProjectId: String(import.meta.env.VITE_PROJECT_ID),
//     appwriteDatabaseId: String(import.meta.env.VITE_DATABASE_ID),
//     appwriteCollectionId: String(import.meta.env.VITE_COLLECTION_ID),
//     appwriteBucketId: String(import.meta.env.VITE_BUCKET_ID)
// }
// export default conf

const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteTableId: String(import.meta.env.VITE_APPWRITE_TABLE_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
};

export default conf;
console.log("Appwrite URL:", import.meta.env.VITE_APPWRITE_URL);
console.log("Table URL:", import.meta.env.VITE_APPWRITE_TABLE_ID);
console.log("Bucket URL:", import.meta.env.VITE_APPWRITE_BUCKET_ID);




