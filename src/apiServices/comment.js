import axios from "axios";

export class CommentService {

    async createComment({web,text}) {
        try {
            if (!web || !text) {
                throw new Error("web or text missing");
            }

            const response = await axios.post("/api/v1/comments/create", {text,web});

            if(response) throw new Error("Error creating comment");

            return response.data;
        } catch (error) {
            console.log("error on commentService.createComment", error);
            return null;
        }
    }

    async updateComment({commentId,text}){
        try {
            if (!commentId || !text) {
                throw new Error("commentId or text missing");
            }

            const response = await axios.patch(`/api/v1/comments/update/${commentId}`, {text});

            if(response) throw new Error("Error updating comment");

            return response.data;
        } catch (error) {
            console.log("error on commentService.updateComment", error);
            return null;
        }
    }

    async deleteComment({commentId}){
        try {
            if (!commentId) {
                throw new Error("commentId missing");
            }

            const response = await axios.delete(`/api/v1/comments/delete/${commentId}`);

            if(response) throw new Error("Error deleting comment");

            return response.data;
        } catch (error) {
            console.log("error on commentService.deleteComment", error);
            return null;
        }
    }

    async getAllCommentsByWebId({webId,page=1,limit=20}){
        try {
            if(!webId) throw new Error("webId is missing");

            const response = await axios.get(`/api/v1/comments/get-comments/${webId}?page=${page}&limit=${limit}`);

            if(!response) throw new Error("response is null");

            return response.data;
        } catch (error) {
            console.log("error on commentService.getAllCommentsByWebId", error)
            return null;
        }
    }

    async getCommentById({commentId}){
        try {
            if(!commentId) throw new Error("CommentId Is missing");

            const response = await axios.get(`/api/v1/comments/get/${commentId}`)

            if(!response) throw new Error("response is null");

            return response.data;
        } catch (error) {
            console.log("error on commentService.getCommentId", error)
            return null;
        }
    }


}

export const commentService = new CommentService();
