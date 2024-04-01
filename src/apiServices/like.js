import axios from "axios";

export class LikeSearvice {

    async toggleLikeWeb({webId}){
        try {
            if(!webId) throw new Error("webId is missing")

            const response = await axios.post(`https://codeweb.onrender.com/api/v1/likes/web/${webId}`);

            return response.data;
        } catch (error) {
            console.log("error on LikeSearvice.toggleLikeWeb",error);
            return {status:error.status,message:error.message,data:null};
        }
    }

    async toggleLikeAsset({assetId}){
        try {
            if(!assetId) throw new Error("assetId is missing")

            const response = await axios.post(`https://codeweb.onrender.com/api/v1/likes/asset/${assetId}`);

            return response.data;
        } catch (error) {
            console.log("error on LikeSearvice.toggleLikeAsset",error);
            return {status:error.status,message:error.message,data:null};
        }
    }

    async toggleLikeCollection({collectionId}){
        try {
            if(!collectionId) throw new Error("collectionId is missing")

            const response = await axios.post(`https://codeweb.onrender.com/api/v1/likes/collection/${collectionId}`);

            return response.data;
        } catch (error) {
            console.log("error on LikeSearvice.toggleLikeCollection",error);
            return {status:error.status,message:error.message,data:null};
        }
    }

    async toggleLikeComment({commentId}){
        try {
            if(!commentId) throw new Error("commentId is missing")

            const response = await axios.post(`https://codeweb.onrender.com/api/v1/likes/comment/${commentId}`);
            
            return response.data;
        } catch (error) {
            console.log("error on LikeSearvice.toggleLikeComment",error);
            return {status:error.status,message:error.message,data:null};
        }
    }

    async toggleLikeReply({replyId}){
        try {
            if(!replyId) throw new Error("replyId is missing")

            const response = await axios.post(`https://codeweb.onrender.com/api/v1/likes/replay/${replyId}`);

            return response.data;
        } catch (error) {
            console.log("error on LikeSearvice.toggleLikeReply",error);
            return {status:error.status,message:error.message,data:null};
        }
    }
    
}

export const likeSearvice = new LikeSearvice();