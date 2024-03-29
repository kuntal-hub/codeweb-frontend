import axios from "axios";

export class AssetService {

    async createNewAsset({title,assetType,assetURL,assetPublicId,isPublic=true}) {
        try {
            if (!title || !assetType || !assetURL || !assetPublicId) {
                throw new Error("Missing required fields");
            }

            const response = await axios.post("/api/v1/assets/create", {
                title,
                assetType,
                assetURL,
                assetPublicId,
                isPublic
            });

            return response.data;
        } catch (error) {
            console.log("Error in AssetService.createNewAsset:", error);
            return {status:error.status,message:error.message,data:null};
        }
    }

    async getMyAssets({page=1, limit=20 , assetType="image"}) {
        try {
            const response = await axios.get(`/api/v1/assets/my-assets?page=${page}&limit=${limit}&assetType=${assetType}`);

            return response.data;
        } catch (error) {
            console.log("Error in AssetService.getMyAssets:", error);
            return {status:error.status,message:error.message,data:null};
        }
    }

    async getAllPublicAssets({page=1, limit=20 , assetType="image"}) {
        try {
            const response = await axios.get(`/api/v1/assets/get?page=${page}&limit=${limit}&assetType=${assetType}`);

            return response.data;
        } catch (error) {
            console.log("Error in AssetService.getAllPublicAssets:", error);
            return {status:error.status,message:error.message,data:null};
        }
    
    }

    async searchFromPublicAssets({search, page=1, limit=20 , assetType="image"}) {
        try {
            if (!search) throw new Error("Missing search text");

            const response = await axios.get(`/api/v1/assets/search/all-assets?search=${search.trim().replaceAll(" ","+")}&page=${page}&limit=${limit}&assetType=${assetType}`);

            return response.data;
        } catch (error) {
            console.log("Error in AssetService.searchFromPublicAssets:", error);
            return {status:error.status,message:error.message,data:null};
        }
    }

    async getAssetById({assetId}) {
        try {
            if (!assetId) throw new Error("Missing assetId");

            const response = await axios.get(`/api/v1/assets/get/${assetId}`);

            return response.data;
        } catch (error) {
            console.log("Error in AssetService.getAssetById:", error);
            return {status:error.status,message:error.message,data:null};
        }
    }

    async deleteAssetById({assetId}) {
        try {
            if (!assetId) throw new Error("Missing assetId");

            const response = await axios.delete(`/api/v1/assets/delete/${assetId}`);

            return response.data;
        } catch (error) {
            console.log("Error in AssetService.deleteAssetById:", error);
            return {status:error.status,message:error.message,data:null};
        }
    }

    async updateAssetById({assetId, title, isPublic}) {
        try {
            if (!assetId) throw new Error("Missing assetId");

            const response = await axios.patch(`/api/v1/assets/update/${assetId}`, {
                title,
                isPublic
            });

            return response.data;
        } catch (error) {
            console.log("Error in AssetService.updateAssetById:", error);
            return {status:error.status,message:error.message,data:null};
        }
    }

    async getLikedAssets({page=1, limit=20 , assetType="image"}) {
        try {
            const response = await axios.get(`/api/v1/assets/liked?page=${page}&limit=${limit}&assetType=${assetType}`);

            return response.data;
        } catch (error) {
            console.log("Error in AssetService.getLikedAssets:", error);
            return {status:error.status,message:error.message,data:null};
        }
    }
    
}

export const assetService = new AssetService();