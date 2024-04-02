import axios from "axios";
const accessToken = localStorage.getItem("accessToken");

class SavedCollectionService {
    async saveCollection({collectionId}) {
        try {
            if(!collectionId) throw new Error("CollectionId is undefined");

            const response = await axios.post(`https://codeweb.onrender.com/api/v1/savedCollections/create/${collectionId}`,{},
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            return response.data;
        } catch (error) {
            console.log("Error in SavedCollectionService.saveCollection",error);
            return {status:error.status,message:error.message,data:null};
        }
    }

    async unsaveCollection({collectionId}) {
        try {
            if(!collectionId) throw new Error("CollectionId is undefined");

            const response = await axios.delete(`https://codeweb.onrender.com/api/v1/savedCollections/delete/${collectionId}`,{},
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            return response.data;
        } catch (error) {
            console.log("Error in SavedCollectionService.unsaveCollection",error);
            return {status:error.status,message:error.message,data:null};
        }
    }

    async getSavedCollections({page=1,limit=10}) {
        try {
            const response = await axios.get(`https://codeweb.onrender.com/api/v1/savedCollections/get?page=${page}&limit=${limit}`,{},
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            return response.data;
        } catch (error) {
            console.log("Error in SavedCollectionService.getSavedCollections",error);
            return {status:error.status,message:error.message,data:null};
        }
    }

    async toggleSavedCollection({collectionId}) {
        try {
            if(!collectionId) throw new Error("CollectionId is undefined");

            const response = await axios.post(`https://codeweb.onrender.com/api/v1/savedCollections/toggle/${collectionId}`,{},
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            return response.data;
        } catch (error) {
            console.log("Error in SavedCollectionService.toggleSavedCollection",error);
            return {status:error.status,message:error.message,data:null};
        }
    }
}

export const savedCollectionService = new SavedCollectionService();