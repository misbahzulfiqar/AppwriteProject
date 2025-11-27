// import conf from '../conf/conf.js';
// import { Client, ID, Databases, Storage, Query } from "appwrite";

// export class Service {
//     client = new Client();
//     databases;
//     bucket;

//     constructor() {
//         this.client
//             .setEndpoint(conf.appwriteUrl)
//             .setProject(conf.appwriteProjectId);

//         this.databases = new Databases(this.client);
//         this.bucket = new Storage(this.client);
//     }

//     // -------------------------
//     // 🔹 Create Post
//     // -------------------------
//     async createPost({ title, slug, content, featuredImage, status, userId }) {
//         try {
//             return await this.databases.createDocument(
//                 conf.appwriteDatabaseId,
//                 conf.appwriteTableId,
//                 ID.unique(), // ✔ auto ID (fixes slug error)
//                 {
//                     title,
//                     slug,          // ✔ store slug as a field
//                     content,
//                     featuredImage,
//                     status,
//                     userId,
//                 }
//             );
//         } catch (error) {
//             console.log("Appwrite service :: createPost :: error", error);
//             return null;
//         }
//     }

//     // -------------------------
//     // 🔹 Update Post
//     // -------------------------
//     async updatePost(docId, { title, slug, content, featuredImage, status }) {
//         try {
//             return await this.databases.updateDocument(
//                 conf.appwriteDatabaseId,
//                 conf.appwriteTableId,
//                 docId,
//                 {
//                     title,
//                     slug,
//                     content,
//                     featuredImage,
//                     status,
//                 }
//             );
//         } catch (error) {
//             console.log("Appwrite service :: updatePost :: error", error);
//             return null;
//         }
//     }

//     // -------------------------
//     // 🔹 Delete Post
//     // -------------------------
//     async deletePost(docId) {
//         try {
//             await this.databases.deleteDocument(
//                 conf.appwriteDatabaseId,
//                 conf.appwriteTableId,
//                 docId
//             );
//             return true;
//         } catch (error) {
//             console.log("Appwrite service :: deletePost :: error", error);
//             return false;
//         }
//     }

//     // -------------------------
//     // 🔹 Get Single Post
//     // -------------------------
//     async getPost(docId) {
//         try {
//             return await this.databases.getDocument(
//                 conf.appwriteDatabaseId,
//                 conf.appwriteTableId,
//                 docId
//             );
//         } catch (error) {
//             console.log("Appwrite service :: getPost :: error", error);
//             return null;
//         }
//     }

//     // -------------------------
//     // 🔹 Get All Posts
//     // -------------------------
//     async getPosts(queries = [Query.equal("status", "active")]) {
//         try {
//             return await this.databases.listDocuments(
//                 conf.appwriteDatabaseId,
//                 conf.appwriteTableId,
//                 queries
//             );
//         } catch (error) {
//             console.log("Appwrite service :: getPosts :: error", error);
//             return [];
//         }
//     }

//     // =====================================================
//     //                     FILE SERVICES
//     // =====================================================

//     // -------------------------
//     // 🔹 Upload File
//     // -------------------------
//     async uploadFile(file) {
//     try {
//         // Validate file exists
//         if (!file) {
//             console.error("❌ No file provided to uploadFile");
//             return null;
//         }
        
//         console.log("📁 File details:", {
//             name: file.name,
//             type: file.type,
//             size: file.size,
//             isFile: file instanceof File
//         });

//         // Check if bucket ID is configured
//         if (!conf.appwriteBucketId) {
//             console.error("❌ Bucket ID not configured");
//             return null;
//         }

//         console.log("🪣 Attempting upload to bucket:", conf.appwriteBucketId);

//         const result = await this.bucket.createFile(
//             conf.appwriteBucketId,
//             ID.unique(),
//             file
//             // Remove permissions array if causing issues
//         );

//         console.log("✅ File uploaded successfully:", result);
//         return result;

//     } catch (error) {
//         console.error("❌ Appwrite service :: uploadFile :: error", error);
//         console.error("Error details:", {
//             message: error.message,
//             code: error.code,
//             type: error.type
//         });
//         return null;
//     }
// }
//     // Delete File
//     async deleteFile(fileId) {
//         try {
//             await this.bucket.deleteFile(
//                 conf.appwriteBucketId,
//                 fileId
//             );
//             return true;
//         } catch (error) {
//             console.log("Appwrite service :: deleteFile :: error", error);
//             return false;
//         }
//     }

//     // -------------------------
//     // 🔹 Get File Preview URL
//     // -------------------------
//     getFilePreview(fileId) {
//         return this.bucket.getFilePreview(
//             conf.appwriteBucketId,
//             fileId
//         );
//     }
// }

// const service = new Service();
// export default service;

import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // =====================================================
    //                     POST SERVICES
    // =====================================================

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                ID.unique(),
                {
                    title,
                    slug,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            );
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
            return null;
        }
    }

    async updatePost(docId, { title, slug, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                docId,
                {
                    title,
                    slug,
                    content,
                    featuredImage,
                    status,
                }
            );
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
            return null;
        }
    }

    async deletePost(docId) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                docId
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(docId) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                docId
            );
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return null;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                queries
            );
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return [];
        }
    }

    // =====================================================
    //                     FILE SERVICES
    // =====================================================

    async uploadFile(file) {
        try {
            if (!file) {
                console.error("❌ No file provided to uploadFile");
                return null;
            }
            
            console.log("📁 Uploading file:", file.name);
            
            const result = await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );

            console.log("✅ File uploaded successfully:", result.$id);
            return result;

        } catch (error) {
            console.error("❌ Appwrite service :: uploadFile :: error", error);
            return null;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            console.log("✅ File deleted successfully:", fileId);
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }

    // -------------------------
    // 🔹 Get File Preview URL
    // -------------------------
    getFilePreview(fileId) {
        try {
            if (!fileId) {
                console.error("❌ No fileId provided to getFilePreview");
                return null;
            }
            
            const url = this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            );
            
            console.log("🖼️ Generated preview URL for:", fileId);
            return url;
            
        } catch (error) {
            console.log("Appwrite service :: getFilePreview :: error", error);
            return null;
        }
    }

    // -------------------------
    // 🔹 Get File View URL (for direct access)
    // -------------------------
    getFileView(fileId) {
        try {
            if (!fileId) {
                console.error("❌ No fileId provided to getFileView");
                return null;
            }
            
            const url = this.bucket.getFileView(
                conf.appwriteBucketId,
                fileId
            );
            
            console.log("🔗 Generated view URL for:", fileId);
            return url;
            
        } catch (error) {
            console.log("Appwrite service :: getFileView :: error", error);
            return null;
        }
    }

    // -------------------------
    // 🔹 Get File Download URL
    // -------------------------
    getFileDownload(fileId) {
        try {
            if (!fileId) {
                console.error("❌ No fileId provided to getFileDownload");
                return null;
            }
            
            const url = this.bucket.getFileDownload(
                conf.appwriteBucketId,
                fileId
            );
            
            console.log("📥 Generated download URL for:", fileId);
            return url;
            
        } catch (error) {
            console.log("Appwrite service :: getFileDownload :: error", error);
            return null;
        }
    }

    // -------------------------
    // 🔹 Update File (if needed)
    // -------------------------
    async updateFile(fileId, file) {
        try {
            if (!fileId || !file) {
                console.error("❌ Missing fileId or file for update");
                return null;
            }
            
            const result = await this.bucket.updateFile(
                conf.appwriteBucketId,
                fileId,
                file
            );
            
            console.log("✅ File updated successfully:", fileId);
            return result;
            
        } catch (error) {
            console.log("Appwrite service :: updateFile :: error", error);
            return null;
        }
    }
}

const service = new Service();
export default service;