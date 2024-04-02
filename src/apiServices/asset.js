import axios from "axios";

export class AssetService {

    async createNewAsset({title,assetType,assetURL,assetPublicId,isPublic=true}) {
        const accessToken = localStorage.getItem("accessToken");
        try {
            if (!title || !assetType || !assetURL || !assetPublicId) {
                throw new Error("Missing required fields");
            }

            const response = await axios.post("https://codeweb.onrender.com/api/v1/assets/create", {
                title,
                assetType,
                assetURL,
                assetPublicId,
                isPublic
            },
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            return response.data;
        } catch (error) {
            console.log("Error in AssetService.createNewAsset:", error);
            return {status:error.status,message:error.message,data:null};
        }
    }

    async getMyAssets({page=1, limit=20 , assetType="image"}) {
        const accessToken = localStorage.getItem("accessToken");
        try {
            const response = await axios.get(`https://codeweb.onrender.com/api/v1/assets/my-assets?page=${page}&limit=${limit}&assetType=${assetType}`,
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            return response.data;
        } catch (error) {
            console.log("Error in AssetService.getMyAssets:", error);
            return {status:error.status,message:error.message,data:null};
        }
    }

    async getAllPublicAssets({page=1, limit=20 , assetType="image"}) {
        const accessToken = localStorage.getItem("accessToken");
        try {
            const response = await axios.get(`https://codeweb.onrender.com/api/v1/assets/get?page=${page}&limit=${limit}&assetType=${assetType}`,
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            return response.data;
        } catch (error) {
            console.log("Error in AssetService.getAllPublicAssets:", error);
            return {status:error.status,message:error.message,data:null};
        }
    
    }

    async searchFromPublicAssets({search, page=1, limit=20 , assetType="image"}) {
        const accessToken = localStorage.getItem("accessToken");
        try {
            if (!search) throw new Error("Missing search text");

            const response = await axios.get(`https://codeweb.onrender.com/api/v1/assets/search/all-assets?search=${search.trim().replaceAll(" ","+")}&page=${page}&limit=${limit}&assetType=${assetType}`,
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            return response.data;
        } catch (error) {
            console.log("Error in AssetService.searchFromPublicAssets:", error);
            return {status:error.status,message:error.message,data:null};
        }
    }

    async getAssetById({assetId}) {
        const accessToken = localStorage.getItem("accessToken");
        try {
            if (!assetId) throw new Error("Missing assetId");

            const response = await axios.get(`https://codeweb.onrender.com/api/v1/assets/get/${assetId}`,
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            return response.data;
        } catch (error) {
            console.log("Error in AssetService.getAssetById:", error);
            return {status:error.status,message:error.message,data:null};
        }
    }

    async deleteAssetById({assetId}) {
        const accessToken = localStorage.getItem("accessToken");
        try {
            if (!assetId) throw new Error("Missing assetId");

            const response = await axios.delete(`https://codeweb.onrender.com/api/v1/assets/delete/${assetId}`,
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            return response.data;
        } catch (error) {
            console.log("Error in AssetService.deleteAssetById:", error);
            return {status:error.status,message:error.message,data:null};
        }
    }

    async updateAssetById({assetId, title, isPublic}) {
        const accessToken = localStorage.getItem("accessToken");
        try {
            if (!assetId) throw new Error("Missing assetId");

            const response = await axios.patch(`https://codeweb.onrender.com/api/v1/assets/update/${assetId}`, {
                title,
                isPublic
            },
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            return response.data;
        } catch (error) {
            console.log("Error in AssetService.updateAssetById:", error);
            return {status:error.status,message:error.message,data:null};
        }
    }

    async getLikedAssets({page=1, limit=20 , assetType="image"}) {
        const accessToken = localStorage.getItem("accessToken");
        try {
            const response = await axios.get(`https://codeweb.onrender.com/api/v1/assets/liked?page=${page}&limit=${limit}&assetType=${assetType}`,
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            return response.data;
        } catch (error) {
            console.log("Error in AssetService.getLikedAssets:", error);
            return {status:error.status,message:error.message,data:null};
        }
    }
    
}

export const assetService = new AssetService();