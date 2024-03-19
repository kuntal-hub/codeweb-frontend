import axios from "axios";

export class CommentService {

    async createComment({web,text}) {
        try {
            if (!web || !text) {
                throw new Error("web or text missing");
            }

            const response = await axios.post("/api/v1/comments/create", {text,web});

            return response.data;
        } catch (error) {
            console.log("error on commentService.createComment", error);
            return {status:error.status,message:error.message,data:null};
        }
    }

    async updateComment({commentId,text}){
        try {
            if (!commentId || !text) {
                throw new Error("commentId or text missing");
            }

            const response = await axios.patch(`/api/v1/comments/update/${commentId}`, {text});

            return response.data;
        } catch (error) {
            console.log("error on commentService.updateComment", error);
            return {status:error.status,message:error.message,data:null};
        }
    }

    async deleteComment({commentId}){
        try {
            if (!commentId) {
                throw new Error("commentId missing");
            }

            const response = await axios.delete(`/api/v1/comments/delete/${commentId}`);

            return response.data;
        } catch (error) {
            console.log("error on commentService.deleteComment", error);
            return {status:error.status,message:error.message,data:null};
        }
    }

    async getAllCommentsByWebId({webId,page=1,limit=20}){
        try {
            if(!webId) throw new Error("webId is missing");

            const response = await axios.get(`/api/v1/comments/get-comments/${webId}?page=${page}&limit=${limit}`);

            return response.data;
        } catch (error) {
            console.log("error on commentService.getAllCommentsByWebId", error)
            return {status:error.status,message:error.message,data:null};
        }
    }

    async getCommentById({commentId}){
        try {
            if(!commentId) throw new Error("CommentId Is missing");

            const response = await axios.get(`/api/v1/comments/get/${commentId}`)

            return response.data;
        } catch (error) {
            console.log("error on commentService.getCommentId", error)
            return {status:error.status,message:error.message,data:null};
        }
    }


}

export const commentService = new CommentService();
