import axios from "axios";
const accessToken = localStorage.getItem("accessToken");

export class ReplySearvice {

    async createReply({commentId,text}){
        try {
            if(!commentId || !text) throw new Error("commentId or Text is Missing");

            const response = await axios.post("https://codeweb.onrender.com/api/v1/replays/create",{commentId,text},
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            })

            return response.data;
        } catch (error) {
            console.log("error on ReplySearvice.createReply",error)
            return {status:error.status,message:error.message,data:null};
        }
    }

    async updateReply({replyId,text}){
        try {
            if(!replyId || !text) throw new Error("replyId or Text is Missing");

            const response = await axios.patch(`https://codeweb.onrender.com/api/v1/replays/update/${replyId}`,{text},
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            })

            return response.data;
        } catch (error) {
            console.log("error on ReplySearvice.updateReply",error)
            return {status:error.status,message:error.message,data:null};
        }
    }

    async deleteReply({replyId}){
        try {
            if(!replyId) throw new Error("replyId is Missing");

            const response = await axios.delete(`https://codeweb.onrender.com/api/v1/replays/delete/${replyId}`,{},
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            return response.data;
        } catch (error) {
            console.log("error on ReplySearvice.deleteReply",error)
            return {status:error.status,message:error.message,data:null};
        }
    }

    async getAllReplies({commentId,page=1,limit=10}){
        try {
            if(!commentId) throw new Error("commentId is Missing");

            const response = await axios.get(`https://codeweb.onrender.com/api/v1/replays/${commentId}?page=${page}&limit=${limit}`,{},
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            return response.data;
        } catch (error) {
            console.log("error on ReplySearvice.getAllReplies",error)
            return {status:error.status,message:error.message,data:null};
        }
    }
}

export const replySearvice = new ReplySearvice();