import axios from "axios";
import { conf } from "../conf/conf";

export class FollowerSearvice {

    async toggleFollow({username}){
        const accessToken = localStorage.getItem("accessToken");
        try {
            if(!username) throw new Error("username is missing");

            const response = await axios.post(`${conf.backendUrl}/api/v1/followers/toggle/${username}`,{},
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            return response.data;
        } catch (error) {
            console.log("error on followerSearvice.toggleFollow",error);
            return {status:error.status,message:error.message,data:null};
        }
    }

    async getFollowers({username,page=1,limit=20}){
        const accessToken = localStorage.getItem("accessToken");
        try {
            if(!username) throw new Error("username is missing");

            const response = await axios.get(`${conf.backendUrl}/api/v1/followers/get-followers/${username}?page=${page}&limit=${limit}`,
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            if(!response) throw new Error("response is null");

            return response.data;
        } catch (error) {
            console.log("error on followerSearvice.getFollowers",error);
            return null;
        }
    }

    async getFollowings({username,page=1,limit=20}){
        const accessToken = localStorage.getItem("accessToken");
        try {
            if(!username) throw new Error("username is missing");

            const response = await axios.get(`${conf.backendUrl}/api/v1/followers/get-followings/${username}?page=${page}&limit=${limit}`,
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            if(!response) throw new Error("response is null");

            return response.data;
        } catch (error) {
            console.log("error on followerSearvice.getFollowings",error);
            return null;
        }
    }
    
}

export const followerSearvice = new FollowerSearvice();