import axios from "axios";

export class ReplySearvice {

    async createReply({commentId,text}){
        try {
            if(!commentId || !text) throw new Error("commentId or Text is Missing");

            const response = await axios.post("https://codeweb.onrender.com/api/v1/replays/create",{commentId,text})

            if(!response) throw new Error("response is null");

            return response.data;
        } catch (error) {
            console.log("error on ReplySearvice.createReply",error)
            return null;
        }
    }

    async updateReply({replyId,text}){
        try {
            if(!replyId || !text) throw new Error("replyId or Text is Missing");

            const response = await axios.patch(`https://codeweb.onrender.com/api/v1/replays/update/${replyId}`,{text})

            if(!response) throw new Error("response is null");

            return response.data;
        } catch (error) {
            console.log("error on ReplySearvice.updateReply",error)
            return null;
        }
    }

    async deleteReply({replyId}){
        try {
            if(!replyId) throw new Error("replyId is Missing");

            const response = await axios.delete(`https://codeweb.onrender.com/api/v1/replays/delete/${replyId}`);

            if(!response) throw new Error("response is null");

            return response.data;
        } catch (error) {
            console.log("error on ReplySearvice.deleteReply",error)
            return null;
        }
    }
}

export const replySearvice = new ReplySearvice();