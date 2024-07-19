import axios from "axios";
import { conf } from "../conf/conf";

export class CollectionService {

    async createCollection({name,description,isPublic=true}) {
        const accessToken = localStorage.getItem("accessToken");
        try {
            if(!name) throw new Error("Name is undefined");

            const response = await axios.post(`${conf.backendUrl}/api/v1/collections/create`,{name,description,isPublic},
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            return response.data;
        } catch (error) {
            console.log("Error in collectionService.createCollection",error);
            return {status:error.status,message:error.message,data:null};
        }
    }

    async updateCollection({collectionId,name,description,isPublic=true}) {
        const accessToken = localStorage.getItem("accessToken");
        try {
            if(!collectionId) throw new Error("CollectionId is undefined");

            if(!name && !description) throw new Error("Name and description both are undefined");

            const response = await axios.patch(`${conf.backendUrl}/api/v1/collections/update/${collectionId}`,{name,description,isPublic},
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            return response.data;
        } catch (error) {
            console.log("Error in collectionService.updateCollection",error);
            return {status:error.status,message:error.message,data:null};
        }
    
    }

    async deleteCollection({collectionId}) {
        const accessToken = localStorage.getItem("accessToken");
        try {
            if(!collectionId) throw new Error("CollectionId is undefined");

            const response = await axios.delete(`${conf.backendUrl}/api/v1/collections/delete/${collectionId}`,
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            return response.data;
        } catch (error) {
            console.log("Error in collectionService.deleteCollection",error);
            return {status:error.status,message:error.message,data:null};
        }
    }

    async addWebToCollection({collectionId,webId}) {
        const accessToken = localStorage.getItem("accessToken");
        try {
            if(!collectionId || !webId) throw new Error("CollectionId or webId is undefined");

            const response = await axios.patch(`${conf.backendUrl}/api/v1/collections/add-web/${collectionId}/${webId}`,{},
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            return response.data;
        } catch (error) {
            console.log("Error in collectionService.addWebToCollection",error);
            return {status:error.status,message:error.message,data:null};
        }
    }

    async removeWebFromCollection({collectionId,webId}) {
        const accessToken = localStorage.getItem("accessToken");
        try {
            if(!collectionId || !webId) throw new Error("CollectionId or webId is undefined");

            const response = await axios.patch(`${conf.backendUrl}/api/v1/collections/remove-web/${collectionId}/${webId}`,{},
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            return response.data;
        } catch (error) {
            console.log("Error in collectionService.removeWebFromCollection",error);
            return {status:error.status,message:error.message,data:null};
        }
    }

    async togglePublishStatus({collectionId}) {
        const accessToken = localStorage.getItem("accessToken");
        try {
            if(!collectionId) throw new Error("CollectionId is undefined");

            const response = await axios.patch(`${conf.backendUrl}/api/v1/collections/toggle-publish-status/${collectionId}`,{},
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            return response.data;
        } catch (error) {
            console.log("Error in collectionService.togglePublishStatus",error);
            return {status:error.status,message:error.message,data:null};
        }
    
    }

    async incresaseViewCount({collectionId}) {
        const accessToken = localStorage.getItem("accessToken");
        try {
            if(!collectionId) throw new Error("CollectionId is undefined");

            const response = await axios.patch(`${conf.backendUrl}/api/v1/collections/inc-view/${collectionId}`,{},
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            return response.data;
        } catch (error) {
            console.log("Error in collectionService.incresaseViewCount",error);
            return {status:error.status,message:error.message,data:null};
        }
    
    }

    async getCollection({collectionId}) {
        const accessToken = localStorage.getItem("accessToken");
        try {
            if(!collectionId) throw new Error("CollectionId is undefined");

            const response = await axios.get(`${conf.backendUrl}/api/v1/collections/get/${collectionId}`,
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            return response.data;
        } catch (error) {
            console.log("Error in collectionService.getCollection",error);
            return {status:error.status,message:error.message,data:null};
        }
    
    }

    async getCollectionWebss({collectionId,page=1,limit=4}) {
        const accessToken = localStorage.getItem("accessToken");
        try {
            if(!collectionId) throw new Error("CollectionId is undefined");

            const response = await axios.get(`${conf.backendUrl}/api/v1/collections/get-webs/${collectionId}?page=${page}&limit=${limit}`,
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            return response.data;
        } catch (error) {
            console.log("Error in collectionService.getCollectionWebss",error);
            return {status:error.status,message:error.message,data:null};
        }
    
    }

    async getCollectionsByUsername({username,sortBy="createdAt",sortOrder="desc",page=1,limit=4}) {
        const accessToken = localStorage.getItem("accessToken");
        try {
            // queryParameters = string contains all querys of url
            // valid querys are page, limit , sortBy, sortOrder, collectionType;
            // collectionType can be public, private
            if(!username) throw new Error("UserId is undefined");

            const response = await axios.get(`${conf.backendUrl}/api/v1/collections/user-collection/${username}?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            return response.data;
        } catch (error) {
            console.log("Error in collectionService.getCollectionsByUserId",error);
            return {status:error.status,message:error.message,data:null};
        }
    
    }

    async getCollectionsCreatedByMe({ sortBy="createdAt",sortOrder="desc",page=1,limit=4,type="all"}) {
        const accessToken = localStorage.getItem("accessToken");
        try {
            // queryParameters = string contains all querys of url
            // valid querys are page, limit , sortBy, sortOrder;
            // sortBy = views,likesCount,websCount,createdAt;
            const response = await axios.get(`${conf.backendUrl}/api/v1/collections/my-collections?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}&type=${type}`,
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            return response.data;
        } catch (error) {
            console.log("Error in collectionService.getCollectionsCreatedByMe",error);
            return {status:error.status,message:error.message,data:null};
        }
    }

    async getLikedCollectionsByUsername({username,page=1,limit=4}) {
        const accessToken = localStorage.getItem("accessToken");
        try {
            // queryParameters = string contains all querys of url
            // valid querys are page, limit , sortBy, sortOrder;
            // sortBy = views,likesCount,websCount,createdAt;
            if(!username) throw new Error("UserId is undefined");

            const response = await axios.get(`${conf.backendUrl}/api/v1/collections/liked/${username}?page=${page}&limit=${limit}`,
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            return response.data;
        } catch (error) {
            console.log("Error in collectionService.getLikedCollectionsByUserId",error);
            return {status:error.status,message:error.message,data:null};
        }
    }

    async searchFromAllCollections({page=1,limit=4,search}) {
        const accessToken = localStorage.getItem("accessToken");
        try {
            if(!search) throw new Error("Search is undefined");

            const response = await axios.get(`${conf.backendUrl}/api/v1/collections/search/all-collections?search=${search.trim().replaceAll(" ","+")}&page=${page}&limit=${limit}`,
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            return response.data;
        } catch (error) {
            console.log("Error in collectionService.searchFromAllCollections",error);
            return {status:error.status,message:error.message,data:null};
        }
    
    }

    async searchFromMyCollections({page=1,limit=4,search,type="all"}) {
        const accessToken = localStorage.getItem("accessToken");
        try {
            if(!search) throw new Error("Search is undefined");

            const response = await axios.get(`${conf.backendUrl}/api/v1/collections/search/my-collections?search=${search.trim().replaceAll(" ","+")}&page=${page}&limit=${limit}&type=${type}`,
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            return response.data;
        } catch (error) {
            console.log("Error in collectionService.searchFromMyCollections",error);
            return {status:error.status,message:error.message,data:null};
        }
    
    }

    async checkCollectionName({name}) {
        const accessToken = localStorage.getItem("accessToken");
        try {
            if(!name) throw new Error("Name is undefined");

            const response = await axios.get(`${conf.backendUrl}/api/v1/collections/check-name-availability/${name.trim().replaceAll(" ","-")}`,
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            return response.data;
        } catch (error) {
            console.log("Error in collectionService.checkCollectionName",error);
            return {status:error.status,message:error.message,data:null};
        }
    
    }
}

export const collectionService = new CollectionService();