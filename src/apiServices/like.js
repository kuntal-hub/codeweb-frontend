import axios from "axios";

export class LikeSearvice {

    async toggleLikeWeb({webId}){
        try {
            if(!webId) throw new Error("webId is missing")

            const response = await axios.post(`https://codeweb.onrender.com/api/v1/likes/web/${webId}`);

            if(!response) throw new Error("response is null")

            return true;
        } catch (error) {
            console.log("error on LikeSearvice.toggleLikeWeb",error);
            return false;
        }
    }

    async toggleLikeAsset({assetId}){
        try {
            if(!assetId) throw new Error("assetId is missing")

            const response = await axios.post(`https://codeweb.onrender.com/api/v1/likes/asset/${assetId}`);

            if(!response) throw new Error("response is null")

            return true;
        } catch (error) {
            console.log("error on LikeSearvice.toggleLikeAsset",error);
            return false;
        }
    }

    async toggleLikeCollection({collectionId}){
        try {
            if(!collectionId) throw new Error("collectionId is missing")

            const response = await axios.post(`https://codeweb.onrender.com/api/v1/likes/collection/${collectionId}`);

            if(!response) throw new Error("response is null")

            return true;
        } catch (error) {
            console.log("error on LikeSearvice.toggleLikeCollection",error);
            return false;
        }
    }

    async toggleLikeComment({commentId}){
        try {
            if(!commentId) throw new Error("commentId is missing")

            const response = await axios.post(`https://codeweb.onrender.com/api/v1/likes/comment/${commentId}`);

            if(!response) throw new Error("response is null")

            return true;
        } catch (error) {
            console.log("error on LikeSearvice.toggleLikeComment",error);
            return false;
        }
    }

    async toggleLikeReply({replyId}){
        try {
            if(!replyId) throw new Error("replyId is missing")

            const response = await axios.post(`https://codeweb.onrender.com/api/v1/likes/replay/${replyId}`);

            if(!response) throw new Error("response is null")

            return true;
        } catch (error) {
            console.log("error on LikeSearvice.toggleLikeReply",error);
            return false;
        }
    }
    
}

export const likeSearvice = new LikeSearvice();