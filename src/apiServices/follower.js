import axios from "axios";

export class FollowerSearvice {

    async toggleFollow({username}){
        try {
            if(!username) throw new Error("username is missing");

            const response = await axios.post(`https://codeweb.onrender.com/api/v1/followers/toggle/${username}`);

            return response.data;
        } catch (error) {
            console.log("error on followerSearvice.toggleFollow",error);
            return {status:error.status,message:error.message,data:null};
        }
    }

    async getFollowers({username,page=1,limit=20}){
        try {
            if(!username) throw new Error("username is missing");

            const response = await axios.get(`https://codeweb.onrender.com/api/v1/followers/get-followers/${username}?page=${page}&limit=${limit}`);

            if(!response) throw new Error("response is null");

            return response.data;
        } catch (error) {
            console.log("error on followerSearvice.getFollowers",error);
            return null;
        }
    }

    async getFollowings({username,page=1,limit=20}){
        try {
            if(!username) throw new Error("username is missing");

            const response = await axios.get(`https://codeweb.onrender.com/api/v1/followers/get-followings/${username}?page=${page}&limit=${limit}`);

            if(!response) throw new Error("response is null");

            return response.data;
        } catch (error) {
            console.log("error on followerSearvice.getFollowings",error);
            return null;
        }
    }
    
}

export const followerSearvice = new FollowerSearvice();