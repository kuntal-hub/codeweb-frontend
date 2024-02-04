import axios from "axios";

export class CollectionService {

    async createCollection({name,description,isPublic=true}) {
        try {
            if(!name) throw new Error("Name is undefined");

            const response = await axios.post("/api/v1/collections/create",{name,description,isPublic});

            if(!response) throw new Error("Response is null");

            return response.data;
        } catch (error) {
            console.log("Error in collectionService.createCollection",error);
            return null;
        }
    }

    async updateCollection({collectionId,name,description}) {
        try {
            if(!collectionId) throw new Error("CollectionId is undefined");

            if(!name && !description) throw new Error("Name and description both are undefined");

            const response = await axios.patch(`/api/v1/collections/update/${collectionId}`,{name,description});

            if(!response) throw new Error("Response is null");

            return response.data;
        } catch (error) {
            console.log("Error in collectionService.updateCollection",error);
            return null;
        }
    
    }

    async deleteCollection({collectionId}) {
        try {
            if(!collectionId) throw new Error("CollectionId is undefined");

            const response = await axios.delete(`/api/v1/collections/delete/${collectionId}`);

            if(!response) throw new Error("Response is null");

            return true;
        } catch (error) {
            console.log("Error in collectionService.deleteCollection",error);
            return false;
        }
    }

    async addWebToCollection({collectionId,webId}) {
        try {
            if(!collectionId || !webId) throw new Error("CollectionId or webId is undefined");

            const response = await axios.patch(`/api/v1/collections/add-web/${collectionId}/${webId}`);

            if(!response) throw new Error("Response is null");

            return response.data;
        } catch (error) {
            console.log("Error in collectionService.addWebToCollection",error);
            return null;
        }
    }

    async removeWebFromCollection({collectionId,webId}) {
        try {
            if(!collectionId || !webId) throw new Error("CollectionId or webId is undefined");

            const response = await axios.patch(`/api/v1/collections/remove-web/${collectionId}/${webId}`);

            if(!response) throw new Error("Response is null");

            return response.data;
        } catch (error) {
            console.log("Error in collectionService.removeWebFromCollection",error);
            return null;
        }
    }

    async togglePublishStatus({collectionId}) {
        try {
            if(!collectionId) throw new Error("CollectionId is undefined");

            const response = await axios.patch(`/api/v1/collections/toggle-publish-status/${collectionId}`);

            if(!response) throw new Error("Response is null");

            return response.data;
        } catch (error) {
            console.log("Error in collectionService.togglePublishStatus",error);
            return null;
        }
    
    }

    async incresaseViewCount({collectionId}) {
        try {
            if(!collectionId) throw new Error("CollectionId is undefined");

            const response = await axios.patch(`/api/v1/collections/inc-view/${collectionId}`);

            if(!response) throw new Error("Response is null");

            return true;
        } catch (error) {
            console.log("Error in collectionService.incresaseViewCount",error);
            return false;
        }
    
    }

    async getCollection({collectionId}) {
        try {
            if(!collectionId) throw new Error("CollectionId is undefined");

            const response = await axios.get(`/api/v1/collections/get/${collectionId}`);

            if(!response) throw new Error("Response is null");

            return response.data;
        } catch (error) {
            console.log("Error in collectionService.getCollection",error);
            return null;
        }
    
    }

    async getCollectionWebss({collectionId,page=1,limit=4}) {
        try {
            if(!collectionId) throw new Error("CollectionId is undefined");

            const response = await axios.get(`/api/v1/collections/get-webs/${collectionId}?page=${page}&limit=${limit}`);

            if(!response) throw new Error("Response is null");

            return response.data;
        } catch (error) {
            console.log("Error in collectionService.getCollectionWebss",error);
            return null;
        }
    
    }

    async getCollectionsByUsername({username,queryParameters="page=1&limit=4&collectionType=public"}) {
        try {
            // queryParameters = string contains all querys of url
            // valid querys are page, limit , sortBy, sortOrder, collectionType;
            // collectionType can be public, private
            if(!username) throw new Error("UserId is undefined");

            const response = await axios.get(`/api/v1/collections/user-collection/${username}?${queryParameters}`);

            if(!response) throw new Error("Response is null");

            return response.data;
        } catch (error) {
            console.log("Error in collectionService.getCollectionsByUserId",error);
            return null;
        }
    
    }

    async getCollectionsCreatedByMe({queryParameters="page=1&limit=4"}) {
        try {
            // queryParameters = string contains all querys of url
            // valid querys are page, limit , sortBy, sortOrder;
            // sortBy = views,likesCount,websCount,createdAt;
            const response = await axios.get(`/api/v1/collections/my-collections?${queryParameters}`);

            if(!response) throw new Error("Response is null");

            return response.data;
        } catch (error) {
            console.log("Error in collectionService.getCollectionsCreatedByMe",error);
            return null;
        }
    }

    async getLikedCollectionsByUsername({username,queryParameters="page=1&limit=4"}) {
        try {
            // queryParameters = string contains all querys of url
            // valid querys are page, limit , sortBy, sortOrder;
            // sortBy = views,likesCount,websCount,createdAt;
            if(!username) throw new Error("UserId is undefined");

            const response = await axios.get(`/api/v1/collections/liked/${username}?${queryParameters}`);

            if(!response) throw new Error("Response is null");

            return response.data;
        } catch (error) {
            console.log("Error in collectionService.getLikedCollectionsByUserId",error);
            return null;
        }
    }

    async searchFromAllCollections({page=1,limit=4,search}) {
        try {
            if(!search) throw new Error("Search is undefined");

            const response = await axios.get(`/api/v1/collections/search/all-collections?search=${search.trim().replaceAll(" ","+")}&page=${page}&limit=${limit}`);

            if(!response) throw new Error("Response is null");

            return response.data;
        } catch (error) {
            console.log("Error in collectionService.searchFromAllCollections",error);
            return null;
        }
    
    }

    async searchFromMyCollections({page=1,limit=4,search}) {
        try {
            if(!search) throw new Error("Search is undefined");

            const response = await axios.get(`/api/v1/collections/search/my-collections?search=${search.trim().replaceAll(" ","+")}&page=${page}&limit=${limit}`);

            if(!response) throw new Error("Response is null");

            return response.data;
        } catch (error) {
            console.log("Error in collectionService.searchFromMyCollections",error);
            return null;
        }
    
    }

    async checkCollectionName({name}) {
        try {
            if(!name) throw new Error("Name is undefined");

            const response = await axios.get(`/api/v1/collections/check-name-availability/${name.trim().replaceAll(" ","-")}`);

            if(!response) throw new Error("Response is null");

            return true;
        } catch (error) {
            console.log("Error in collectionService.checkCollectionName",error);
            return false;
        }
    
    }


}

export const collectionService = new CollectionService();