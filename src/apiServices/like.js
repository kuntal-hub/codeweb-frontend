import axios from "axios";

export class LikeSearvice {

    async toggleLikeWeb({webId}){
        const accessToken = localStorage.getItem("accessToken");
        try {
            if(!webId) throw new Error("webId is missing")

            const response = await axios.post(`https://codeweb.onrender.com/api/v1/likes/web/${webId}`,
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            return response.data;
        } catch (error) {
            console.log("error on LikeSearvice.toggleLikeWeb",error);
            return {status:error.status,message:error.message,data:null};
        }
    }

    async toggleLikeAsset({assetId}){
        const accessToken = localStorage.getItem("accessToken");
        try {
            if(!assetId) throw new Error("assetId is missing")

            const response = await axios.post(`https://codeweb.onrender.com/api/v1/likes/asset/${assetId}`,
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            return response.data;
        } catch (error) {
            console.log("error on LikeSearvice.toggleLikeAsset",error);
            return {status:error.status,message:error.message,data:null};
        }
    }

    async toggleLikeCollection({collectionId}){
        const accessToken = localStorage.getItem("accessToken");
        try {
            if(!collectionId) throw new Error("collectionId is missing")

            const response = await axios.post(`https://codeweb.onrender.com/api/v1/likes/collection/${collectionId}`,
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            return response.data;
        } catch (error) {
            console.log("error on LikeSearvice.toggleLikeCollection",error);
            return {status:error.status,message:error.message,data:null};
        }
    }

    async toggleLikeComment({commentId}){
        const accessToken = localStorage.getItem("accessToken");
        try {
            if(!commentId) throw new Error("commentId is missing")

            const response = await axios.post(`https://codeweb.onrender.com/api/v1/likes/comment/${commentId}`,
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });
            
            return response.data;
        } catch (error) {
            console.log("error on LikeSearvice.toggleLikeComment",error);
            return {status:error.status,message:error.message,data:null};
        }
    }

    async toggleLikeReply({replyId}){
        const accessToken = localStorage.getItem("accessToken");
        try {
            if(!replyId) throw new Error("replyId is missing")

            const response = await axios.post(`https://codeweb.onrender.com/api/v1/likes/replay/${replyId}`,
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            return response.data;
        } catch (error) {
            console.log("error on LikeSearvice.toggleLikeReply",error);
            return {status:error.status,message:error.message,data:null};
        }
    }
    
}

export const likeSearvice = new LikeSearvice();