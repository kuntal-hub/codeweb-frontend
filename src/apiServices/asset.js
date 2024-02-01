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

            if (!response) throw new Error("response is undefined");

            return response.data;
        } catch (error) {
            console.log("Error in AssetService.createNewAsset:", error);
            return null;
        }
    }

    async getMyAssets(page=1, limit=20 , assetType="image") {
        try {
            const response = await axios.get(`/api/v1/assets/my-assets?page=${page}&limit=${limit}&assetType=${assetType}`);

            if (!response) throw new Error("response is undefined");

            return response.data;
        } catch (error) {
            console.log("Error in AssetService.getMyAssets:", error);
            return null;
        }
    }

    async getAllPublicAssets(page=1, limit=20 , assetType="image") {
        try {
            const response = await axios.get(`/api/v1/assets/get?page=${page}&limit=${limit}&assetType=${assetType}`);

            if (!response) throw new Error("response is undefined");

            return response.data;
        } catch (error) {
            console.log("Error in AssetService.getAllPublicAssets:", error);
            return null;
        }
    
    }

    async searchFromPublicAssets(search, page=1, limit=20 , assetType="image") {
        try {
            if (!search) throw new Error("Missing search text");

            const response = await axios.get(`/api/v1/assets/search/all-assets?search=${search.trim().replaceAll(" ","+")}&page=${page}&limit=${limit}&assetType=${assetType}`);

            if (!response) throw new Error("response is undefined");

            return response.data;
        } catch (error) {
            console.log("Error in AssetService.searchFromPublicAssets:", error);
            return null;
        }
    }

    async getAssetById({assetId}) {
        try {
            if (!assetId) throw new Error("Missing assetId");

            const response = await axios.get(`/api/v1/assets/get/${assetId}`);

            if (!response) throw new Error("response is undefined");

            return response.data;
        } catch (error) {
            console.log("Error in AssetService.getAssetById:", error);
            return null;
        }
    }

    async deleteAssetById({assetId}) {
        try {
            if (!assetId) throw new Error("Missing assetId");

            const response = await axios.delete(`/api/v1/assets/delete/${assetId}`);

            if (!response) throw new Error("response is undefined");

            return true;
        } catch (error) {
            console.log("Error in AssetService.deleteAssetById:", error);
            return false;
        }
    }

    async updateAssetById({assetId, title, isPublic}) {
        try {
            if (!assetId) throw new Error("Missing assetId");

            const response = await axios.patch(`/api/v1/assets/update/${assetId}`, {
                title,
                isPublic
            });

            if (!response) throw new Error("response is undefined");

            return response.data;
        } catch (error) {
            console.log("Error in AssetService.updateAssetById:", error);
            return null;
        }
    }

    async getLikedAssets(page=1, limit=20 , assetType="image") {
        try {
            const response = await axios.get(`/api/v1/assets/liked?page=${page}&limit=${limit}&assetType=${assetType}`);

            if (!response) throw new Error("response is undefined");

            return response.data;
        } catch (error) {
            console.log("Error in AssetService.getLikedAssets:", error);
            return null;
        }
    }
    
}

export const assetService = new AssetService();