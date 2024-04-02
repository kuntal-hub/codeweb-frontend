import axios from "axios";

export class AuthServices {

    async createUser ({username,email,password,fullName,verificationURL="https://codeweb-woad.vercel.app/verify-email"}) {
        const accessToken = localStorage.getItem("accessToken");
        try {
            if (!username || !email || !password || !fullName) throw new Error("username or email or password or fullName is null");

            const responce = await axios.post("https://codeweb.onrender.com/api/v1/users/register", {
                username,
                email,
                password,
                fullName,
                verificationURL
            },{
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            if (responce.data.status>=400){
                return {message:responce.data.message,status:responce.data.status,data:null};
            } 
            
            return await this.login({identifier:email,password});

        } catch (error) {
            console.log("authServices.createUser error: ", error);
            return {message:error.message,status:error.status||500,data:null};
        }
    }

    async login ({identifier,password}) {
        const accessToken = localStorage.getItem("accessToken");
        try {
            if (!identifier || !password) throw new Error("identifier or password is null");

            const responce = await axios.post("https://codeweb.onrender.com/api/v1/users/login", {
                identifier,
                password
            },{
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            if (responce.data.status>=400 || !responce.data.data){
                return {message:responce.data.message,status:responce.data.status,data:null};
            }

            localStorage.setItem("accessToken",responce.data.data.accessToken);
            localStorage.setItem("refreshToken",responce.data.data.refreshToken);

            return {status:responce.data.status,data:responce.data.data.user,message:responce.data.message};
        } catch (error) {
            console.log("authServices.login error: ", error);
            return {status:error.status,message:error.message,data:null};
        }
    }

    async logout ({fromAllDevices=true}) {
        const accessToken = localStorage.getItem("accessToken");
        try {
            const responce = await axios.post(`https://codeweb.onrender.com/api/v1/users/logout?fromAllDevices=${fromAllDevices}`,
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            if (responce.data.status>=400) return false;

            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.clear();

            return true;
        } catch (error) {
            console.log("authServices.logout error: ", error);
            return false;
        }
    }

    async refreshAccessToken () {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        try {
            const responce = await axios.post("https://codeweb.onrender.com/api/v1/users/refresh-token",
            {
                headers:{
                    "Authorization":`Bearer ${refreshToken}`,
                }
            });

            if (responce.data.status>=400){
                return {status:responce.data.status,message:responce.data.message,data:null};
            }

            localStorage.setItem("accessToken",responce.data.data.accessToken);

            return await this.getCurrentUser();
        } catch (error) {
            console.log("authServices.refreshAccessToken error: ", error);
            return {status:error.status,message:error.message,data:null};
        }
    }

    async getCurrentUser () {
        const accessToken = localStorage.getItem("accessToken");
        try {
            const responce = await axios.get("https://codeweb.onrender.com/api/v1/users/me",{
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            if (responce.data.status>=400){
                return {status:responce.data.status,message:responce.data.message,data:null};
            }

            return responce.data;
        } catch (error) {
            console.log("authServices.getCurrentUser error: ", error);
            return {status:error.status,data:null,message:error.message};
        }
    
    }

    async requestVeryficationEmail ({verificationURL="https://codeweb-woad.vercel.app/verify-email"}) {
        const accessToken = localStorage.getItem("accessToken");
        try {
            const responce = await axios.post("https://codeweb.onrender.com/api/v1/users/request-verify-email", {
                verificationURL
            },
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            if (responce.data.status>=400) return {status:responce.data.status,message:responce.data.message,data:false};

            return {status:responce.data.status,data:true,message:responce.data.message};
        } catch (error) {
            console.log("authServices.requestVeryficationEmail error: ", error);
            return {status:error.status,message:error.message,data:false};
        }
    
    }

    async verifyEmail ({token}) {
        const accessToken = localStorage.getItem("accessToken");
        try {
            if (!token) throw new Error("token is null");

            const responce = await axios.post("https://codeweb.onrender.com/api/v1/users/verify-email", {
                token
            },{
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            if (responce.data.status>=400) return {status:responce.data.status,message:responce.data.message,data:null};

            return {status:responce.data.status,data:responce.data.data,message:responce.data.message};
        } catch (error) {
            console.log("authServices.verifyEmail error: ", error);
            return {status:error.status,message:error.message,data:null};
        }
    
    }

    async requestForgotPasswordEmail ({email,resetPasswordURL="https://codeweb-woad.vercel.app/reset-password"}) {
        const accessToken = localStorage.getItem("accessToken");
        try {
            if (!email) throw new Error("email is null");

            const responce = await axios.post("https://codeweb.onrender.com/api/v1/users/request-forgot-password-email", {
                email,
                resetPasswordURL
            },{
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            if (responce.data.status>=400) return {status:responce.data.status,message:responce.data.message,data:null};

            return {status:responce.data.status,data:{},message:responce.data.message};
        } catch (error) {
            console.log("authServices.requestForgotPasswordEmail error: ", error);
            return {status:error.status,message:error.message,data:null};
        }
    
    }

    async resetPasswrod ({token,newPassword}) {
        const accessToken = localStorage.getItem("accessToken");
        try {
            if (!token || !newPassword) throw new Error("token or newPassword is null");

            const responce = await axios.post("https://codeweb.onrender.com/api/v1/users/reset-password", {
                token,
                newPassword
            },{
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            if (responce.data.status>=400) return {status:responce.data.status,message:responce.data.message,data:null};

            return {status:responce.data.status,data:{},message:responce.data.message};
        } catch (error) {
            console.log("authServices.resetPassrod error: ", error);
            return {status:error.status,message:error.message,data:null};
        }
    
    }

    async updateUser(data) {
        const accessToken = localStorage.getItem("accessToken");
        // data = {fullName,bio,link1,link2,link3}
        try {
            if (!data) throw new Error("data is null");

            const responce = await axios.patch("https://codeweb.onrender.com/api/v1/users/update",{...data},
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            if (responce.data.status>=400) return {status:responce.data.status,message:responce.data.message,data:null};

            return responce.data;
        } catch (error) {
            console.log("authServices.updateUser error: ", error);
            return {status:error.status,message:error.message,data:null};
        }
    }

    async chengePassword({oldPassword,newPassword}){
        const accessToken = localStorage.getItem("accessToken");
        try {
            if (!oldPassword || !newPassword) throw new Error("oldPassword or newPassword is null");

            const responce = await axios.post("https://codeweb.onrender.com/api/v1/users/change-password",{oldPassword,newPassword},
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            if (responce.data.status>=400) return {status:responce.data.status,message:responce.data.message,data:null};

            return {status:responce.data.status,data:true,message:responce.data.message};
        } catch (error) {
            console.log("authServices.chengePassword error: ", error);
            return {status:error.status,message:error.message,data:false};
        }
    }

    async chengeEmail({email,password,verificationURL="https://codeweb-woad.vercel.app/verify-email"}){
        const accessToken = localStorage.getItem("accessToken");
        try {
            if(!email || !password) throw new Error("email or password is null");

            const responce = await axios.post("https://codeweb.onrender.com/api/v1/users/change-email",{email,password,verificationURL},
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            if (responce.data.status>=400) return {status:responce.data.status,message:responce.data.message,data:null};

            return responce.data;
        } catch (error) {
            console.log("authServices.chengeEmail error: ", error);
            return {status:error.status,message:error.message,data:null};
        }
    }

    async deleteUser({password}){
        const accessToken = localStorage.getItem("accessToken");
        try {
            if (!password) throw new Error("password is null");

            const responce = await axios.delete(`https://codeweb.onrender.com/api/v1/users/delete/${password}`,
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            if (responce.data.status>=400) return {status:responce.data.status,message:responce.data.message,data:false};

            return {status:responce.data.status,data:true,message:responce.data.message};
        } catch (error) {
            console.log("authServices.deleteUser error: ", error);
            return {status:error.status,message:error.message,data:false};
        }
    }

    async updateAvatar({image,public_id}){
        const accessToken = localStorage.getItem("accessToken");
        try {
            if(!image || !public_id) throw new Error("image or public_id is null");

            const responce = await axios.patch("https://codeweb.onrender.com/api/v1/users/update-avatar",{image,public_id},
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            if (responce.data.status>=400) return {status:responce.data.status,message:responce.data.message,data:null};

            return responce.data;
        } catch (error) {
            console.log("authServices.updateAvatar error: ", error);
            return {status:error.status,message:error.message,data:null};
        }
    }

    async updateCoverImage({image,public_id}){
        const accessToken = localStorage.getItem("accessToken");
        try {
            if(!image || !public_id) throw new Error("image or public_id is null");

            const responce = await axios.patch("https://codeweb.onrender.com/api/v1/users/update-cover-image",{image,public_id},
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            if (responce.data.status>=400) return {status:responce.data.status,message:responce.data.message,data:null};

            return responce.data;
        } catch (error) {
            console.log("authServices.updateCoverImage error: ", error);
            return {status:error.status,message:error.message,data:null};
        }
    }

    async getUserProfile({username}){
        const accessToken = localStorage.getItem("accessToken");
        try {
            if(!username) throw new Error("username is null");

            const responce = await axios.get(`https://codeweb.onrender.com/api/v1/users/profile/${username}`,
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            if (!responce) throw new Error("responce is null");

            return responce.data;
        } catch (error) {
            console.log("authServices.getUserProfile error: ", error);
            return null;
        }
    }

    async getShowcaseItems({username}) {
        const accessToken = localStorage.getItem("accessToken");
        try {
            if(!username) throw new Error("username is null");

            const responce = await axios.get(`https://codeweb.onrender.com/api/v1/users/showcase/${username}`,
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            if (!responce) throw new Error("responce is null");

            return responce.data;
        } catch (error) {
            console.log("authServices.getShowcaseItems error: ", error);
            return null;
        }
    }

    async getPinedItems({page=1,limit=4}){
        const accessToken = localStorage.getItem("accessToken");
        try {
            const responce = await axios.get(`https://codeweb.onrender.com/api/v1/users/pined?page=${page}&limit=${limit}`,
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            if (!responce) throw new Error("responce is null");

            return responce.data;
        } catch (error) {
            console.log("authServices.getPinedItems error: ", error);
            return null;
        }
    }

    async addToPinedItems({webId}){
        const accessToken = localStorage.getItem("accessToken");
        try {
            if(!webId) throw new Error("webId is null");

            const responce = await axios.patch(`https://codeweb.onrender.com/api/v1/users/add-to-pined/${webId}`,
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            return responce.data;
        } catch (error) {
            console.log("authServices.addToPinedItems error: ", error);
            return {status:error.status,message:error.message,data:null};
        }
    
    }

    async removePinedItem({webId}){
        const accessToken = localStorage.getItem("accessToken");
        try {
            if(!webId) throw new Error("webId is null");

            const responce = await axios.patch(`https://codeweb.onrender.com/api/v1/users/remove-pined/${webId}`,
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            return responce.data;
        } catch (error) {
            console.log("authServices.removePinedItem error: ", error);
            return {status:error.status,message:error.message,data:null};
        }
    }

    async updateShowcase({showcase}){
        const accessToken = localStorage.getItem("accessToken");
        try {
            if(!showcase) throw new Error("showcase is null");

            const responce = await axios.patch("https://codeweb.onrender.com/api/v1/users/update-showcase",{showcase},
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            if (!responce) throw new Error("responce is null");

            return responce.data;
        } catch (error) {
            console.log("authServices.updateShowcase error: ", error);
            return null;
        }
    }

    async checkUsernameAvailablity({username}){
        const accessToken = localStorage.getItem("accessToken");
        try {
            if(!username) throw new Error("username is null");

            const responce = await axios.get(`https://codeweb.onrender.com/api/v1/users/check-username-availability/${username}`,
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            if (responce.data.status>=400) return false;

            return true;
        } catch (error) {
            console.log("authServices.checkUsernameAvailablity error: ", error);
            return false;
        }
    }

    async searchUsers({search,page=1,limit=6}){
        const accessToken = localStorage.getItem("accessToken");
        try {
            if(!search) throw new Error("search is null");

            const responce = await axios.get(`https://codeweb.onrender.com/api/v1/users/search?search=${search}&page=${page}&limit=${limit}`,
            {
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                }
            });

            if (!responce) throw new Error("responce is null");

            return responce.data;
        } catch (error) {
            console.log("authServices.searchUsers error: ", error);
            return null;
        }
    }
}

export const authServices = new AuthServices();
