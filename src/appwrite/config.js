import { Client, Databases, Storage, ID, Query } from "appwrite";
import conf from "../conf/conf";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client);
    }
    async createPost({ title, slug, content, featuredImage, status, userID }) {
        try {
            return await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {   // slug is the unique ID you can also write ID.unique()
                title,
                content,
                featuredImage,
                status,
                userID
            })
        } catch (error) {
            console.log('appwrite :: createPost : error', error);
        }
    }
    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log('appwrite :: updatePost : error', error);
        }
    }
    async deletePost(slug) {
        try {
            return this.databases, this.deletePost(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;

        } catch (error) {
            console.log('appwrite :: deletePost : error', error);
            return false;
        }
    }
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log('appwrite :: getPost : error', error)
        }
    }
    async getPosts(queries = [Query.equal("status", "active")]) { // we want only those posts whose status are active thats why we are using a query
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log('appwrite :: getPosts : error', error);
            return false;
        }
    }
    // file upload Services
    async uploadFile(file) {
        try {
            return this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log('appwrite :: uploadFile : error', error)
        }
    }
    async deleteFile(fileID) {
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileID
            )
            return true;
        } catch (error) {
            console.log('appwrite :: deleteFile : error', error);
            return false;
        }
    }
    getFilePreview(fileID) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileID
        )
    }
}

const service = new Service();
export default service; 