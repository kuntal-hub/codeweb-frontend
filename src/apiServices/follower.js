import axios from "axios";

export class FollowerSearvice {

    async toggleFollow({profileId}){
        try {
            if(!profileId) throw new Error("profileId is missing");

            const response = await axios.post(`/api/v1/followers/toggle/${profileId}`);

            if(!response) throw new Error("response is null");

            return true
        } catch (error) {
            console.log("error on followerSearvice.toggleFollow",error);
            return false;
        }
    }

    async getFollowers({profileId,page=1,limit=20}){
        try {
            if(!profileId) throw new Error("profileId is missing");

            const response = await axios.get(`/api/v1/followers/get-followers/${profileId}?page=${page}&limit=${limit}`);

            if(!response) throw new Error("response is null");

            return response.data;
        } catch (error) {
            console.log("error on followerSearvice.getFollowers",error);
            return null;
        }
    }

    async getFollowings({profileId,page=1,limit=20}){
        try {
            if(!profileId) throw new Error("profileId is missing");

            const response = await axios.get(`/api/v1/followers/get-followings/${profileId}?page=${page}&limit=${limit}`);

            if(!response) throw new Error("response is null");

            return response.data;
        } catch (error) {
            console.log("error on followerSearvice.getFollowings",error);
            return null;
        }
    }
    
}

export const followerSearvice = new FollowerSearvice();