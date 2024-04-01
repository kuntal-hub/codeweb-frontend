import axios from "axios";

export class AuthServices {

    async createUser ({username,email,password,fullName,verificationURL="http://localhost:5173/verify-email"}) {
        try {
            if (!username || !email || !password || !fullName) throw new Error("username or email or password or fullName is null");

            const responce = await axios.post("https://codeweb.onrender.com/api/v1/users/register", {
                username,
                email,
                password,
                fullName,
                verificationURL
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
        try {
            if (!identifier || !password) throw new Error("identifier or password is null");

            const responce = await axios.post("https://codeweb.onrender.com/api/v1/users/login", {
                identifier,
                password
            });

            let currentDate = new Date();

            // Get the current date and time
            let expirationDate1 = new Date(currentDate.getTime() + (30 * 24 * 60 * 60 * 1000)); // 30 days from now
            let expirationDate2 = new Date(currentDate.getTime() + (24 * 60 * 60 * 1000)); // 24 hours from now

            // Convert the expiration date to the UTC string format
            expirationDate1 = expirationDate1.toUTCString();
            expirationDate2 = expirationDate2.toUTCString();

            document.cookie = `refreshToken=${responce.data.data.refreshToken}; path=/; domain=onrender.com;
            sameSite=None; secure; expires=${expirationDate1};`

            document.cookie = `accessToken=${responce.data.data.accessToken}; path=/; domain=onrender.com;
            sameSite=None; secure; expires=${expirationDate2};`

            if (responce.data.status>=400){
                return {message:responce.data.message,status:responce.data.status,data:null};
            }

            return {status:responce.data.status,data:responce.data.data.user,message:responce.data.message};
        } catch (error) {
            console.log("authServices.login error: ", error);
            return {status:error.status,message:error.message,data:null};
        }
    }

    async logout ({fromAllDevices=true}) {
        try {
            const responce = await axios.post(`https://codeweb.onrender.com/api/v1/users/logout?fromAllDevices=${fromAllDevices}`);

            if (responce.data.status>=400) return false;

            let currentDate = new Date();

            // Get the current date and time
            let expirationDate1 = new Date(currentDate.getTime() + (30 * 24 * 60 * 60 * 1000)); // 30 days from now
            let expirationDate2 = new Date(currentDate.getTime() + (24 * 60 * 60 * 1000)); // 24 hours from now

            // Convert the expiration date to the UTC string format
            expirationDate1 = expirationDate1.toUTCString();
            expirationDate2 = expirationDate2.toUTCString();

            document.cookie = `refreshToken=; path=/; domain=onrender.com; sameSite=None; secure; expires=${expirationDate1};`

            document.cookie = `accessToken=; path=/; domain=onrender.com; sameSite=None; secure; expires=${expirationDate2};`

            return true;
        } catch (error) {
            console.log("authServices.logout error: ", error);
            return false;
        }
    }

    async refreshAccessToken () {
        try {
            const responce = await axios.post("https://codeweb.onrender.com/api/v1/users/refresh-token");

            if (responce.data.status>=400){
                return {status:responce.data.status,message:responce.data.message,data:null};
            }

            let currentDate = new Date();

            // Get the current date and time
            let expirationDate2 = new Date(currentDate.getTime() + (24 * 60 * 60 * 1000)); // 24 hours from now

            // Convert the expiration date to the UTC string format
            expirationDate2 = expirationDate2.toUTCString();

            document.cookie = `accessToken=${responce.data.data.accessToken}; path=/; domain=onrender.com;
            sameSite=None; secure; expires=${expirationDate2};`

            return await this.getCurrentUser();
        } catch (error) {
            console.log("authServices.refreshAccessToken error: ", error);
            return {status:error.status,message:error.message,data:null};
        }
    }

    async getCurrentUser () {
        try {
            const responce = await axios.get("https://codeweb.onrender.com/api/v1/users/me");
            if (responce.data.status>=400){
                return {status:responce.data.status,message:responce.data.message,data:null};
            }

            return responce.data;
        } catch (error) {
            console.log("authServices.getCurrentUser error: ", error);
            return {status:error.status,data:null,message:error.message};
        }
    
    }

    async requestVeryficationEmail ({verificationURL="http://localhost:5173/verify-email"}) {
        try {
            const responce = await axios.post("https://codeweb.onrender.com/api/v1/users/request-verify-email", {
                verificationURL
            });

            if (responce.data.status>=400) return {status:responce.data.status,message:responce.data.message,data:false};

            return {status:responce.data.status,data:true,message:responce.data.message};
        } catch (error) {
            console.log("authServices.requestVeryficationEmail error: ", error);
            return {status:error.status,message:error.message,data:false};
        }
    
    }

    async verifyEmail ({token}) {
        try {
            if (!token) throw new Error("token is null");

            const responce = await axios.post("https://codeweb.onrender.com/api/v1/users/verify-email", {
                token
            });

            if (responce.data.status>=400) return {status:responce.data.status,message:responce.data.message,data:null};

            return {status:responce.data.status,data:responce.data.data,message:responce.data.message};
        } catch (error) {
            console.log("authServices.verifyEmail error: ", error);
            return {status:error.status,message:error.message,data:null};
        }
    
    }

    async requestForgotPasswordEmail ({email,resetPasswordURL="http://localhost:5173/reset-password"}) {
        try {
            if (!email) throw new Error("email is null");

            const responce = await axios.post("https://codeweb.onrender.com/api/v1/users/request-forgot-password-email", {
                email,
                resetPasswordURL
            });

            if (responce.data.status>=400) return {status:responce.data.status,message:responce.data.message,data:null};

            return {status:responce.data.status,data:{},message:responce.data.message};
        } catch (error) {
            console.log("authServices.requestForgotPasswordEmail error: ", error);
            return {status:error.status,message:error.message,data:null};
        }
    
    }

    async resetPasswrod ({token,newPassword}) {
        try {
            if (!token || !newPassword) throw new Error("token or newPassword is null");

            const responce = await axios.post("https://codeweb.onrender.com/api/v1/users/reset-password", {
                token,
                newPassword
            });

            if (responce.data.status>=400) return {status:responce.data.status,message:responce.data.message,data:null};

            return {status:responce.data.status,data:{},message:responce.data.message};
        } catch (error) {
            console.log("authServices.resetPassrod error: ", error);
            return {status:error.status,message:error.message,data:null};
        }
    
    }

    async updateUser(data) {
        // data = {fullName,bio,link1,link2,link3}
        try {
            if (!data) throw new Error("data is null");

            const responce = await axios.patch("https://codeweb.onrender.com/api/v1/users/update",{...data});

            if (responce.data.status>=400) return {status:responce.data.status,message:responce.data.message,data:null};

            return responce.data;
        } catch (error) {
            console.log("authServices.updateUser error: ", error);
            return {status:error.status,message:error.message,data:null};
        }
    }

    async chengePassword({oldPassword,newPassword}){
        try {
            if (!oldPassword || !newPassword) throw new Error("oldPassword or newPassword is null");

            const responce = await axios.post("https://codeweb.onrender.com/api/v1/users/change-password",{oldPassword,newPassword});

            if (responce.data.status>=400) return {status:responce.data.status,message:responce.data.message,data:null};

            return {status:responce.data.status,data:true,message:responce.data.message};
        } catch (error) {
            console.log("authServices.chengePassword error: ", error);
            return {status:error.status,message:error.message,data:false};
        }
    }

    async chengeEmail({email,password,verificationURL="http://localhost:5173/verify-email"}){
        try {
            if(!email || !password) throw new Error("email or password is null");

            const responce = await axios.post("https://codeweb.onrender.com/api/v1/users/change-email",{email,password,verificationURL});

            if (responce.data.status>=400) return {status:responce.data.status,message:responce.data.message,data:null};

            return responce.data;
        } catch (error) {
            console.log("authServices.chengeEmail error: ", error);
            return {status:error.status,message:error.message,data:null};
        }
    }

    async deleteUser({password}){
        try {
            if (!password) throw new Error("password is null");

            const responce = await axios.delete(`https://codeweb.onrender.com/api/v1/users/delete/${password}`);

            if (responce.data.status>=400) return {status:responce.data.status,message:responce.data.message,data:false};

            return {status:responce.data.status,data:true,message:responce.data.message};
        } catch (error) {
            console.log("authServices.deleteUser error: ", error);
            return {status:error.status,message:error.message,data:false};
        }
    }

    async updateAvatar({image,public_id}){
        try {
            if(!image || !public_id) throw new Error("image or public_id is null");

            const responce = await axios.patch("https://codeweb.onrender.com/api/v1/users/update-avatar",{image,public_id});

            if (responce.data.status>=400) return {status:responce.data.status,message:responce.data.message,data:null};

            return responce.data;
        } catch (error) {
            console.log("authServices.updateAvatar error: ", error);
            return {status:error.status,message:error.message,data:null};
        }
    }

    async updateCoverImage({image,public_id}){
        try {
            if(!image || !public_id) throw new Error("image or public_id is null");

            const responce = await axios.patch("https://codeweb.onrender.com/api/v1/users/update-cover-image",{image,public_id});

            if (responce.data.status>=400) return {status:responce.data.status,message:responce.data.message,data:null};

            return responce.data;
        } catch (error) {
            console.log("authServices.updateCoverImage error: ", error);
            return {status:error.status,message:error.message,data:null};
        }
    }

    async getUserProfile({username}){
        try {
            if(!username) throw new Error("username is null");

            const responce = await axios.get(`https://codeweb.onrender.com/api/v1/users/profile/${username}`);

            if (!responce) throw new Error("responce is null");

            return responce.data;
        } catch (error) {
            console.log("authServices.getUserProfile error: ", error);
            return null;
        }
    }

    async getShowcaseItems({username}) {
        try {
            if(!username) throw new Error("username is null");

            const responce = await axios.get(`https://codeweb.onrender.com/api/v1/users/showcase/${username}`);

            if (!responce) throw new Error("responce is null");

            return responce.data;
        } catch (error) {
            console.log("authServices.getShowcaseItems error: ", error);
            return null;
        }
    }

    async getPinedItems({page=1,limit=4}){
        try {
            const responce = await axios.get(`https://codeweb.onrender.com/api/v1/users/pined?page=${page}&limit=${limit}`);

            if (!responce) throw new Error("responce is null");

            return responce.data;
        } catch (error) {
            console.log("authServices.getPinedItems error: ", error);
            return null;
        }
    }

    async addToPinedItems({webId}){
        try {
            if(!webId) throw new Error("webId is null");

            const responce = await axios.patch(`https://codeweb.onrender.com/api/v1/users/add-to-pined/${webId}`);

            return responce.data;
        } catch (error) {
            console.log("authServices.addToPinedItems error: ", error);
            return {status:error.status,message:error.message,data:null};
        }
    
    }

    async removePinedItem({webId}){
        try {
            if(!webId) throw new Error("webId is null");

            const responce = await axios.patch(`https://codeweb.onrender.com/api/v1/users/remove-pined/${webId}`);

            return responce.data;
        } catch (error) {
            console.log("authServices.removePinedItem error: ", error);
            return {status:error.status,message:error.message,data:null};
        }
    }

    async updateShowcase({showcase}){
        try {
            if(!showcase) throw new Error("showcase is null");

            const responce = await axios.patch("https://codeweb.onrender.com/api/v1/users/update-showcase",{showcase});

            if (!responce) throw new Error("responce is null");

            return responce.data;
        } catch (error) {
            console.log("authServices.updateShowcase error: ", error);
            return null;
        }
    }

    async checkUsernameAvailablity({username}){
        try {
            if(!username) throw new Error("username is null");

            const responce = await axios.get(`https://codeweb.onrender.com/api/v1/users/check-username-availability/${username}`);

            if (responce.data.status>=400) return false;

            return true;
        } catch (error) {
            console.log("authServices.checkUsernameAvailablity error: ", error);
            return false;
        }
    }

    async searchUsers({search,page=1,limit=6}){
        try {
            if(!search) throw new Error("search is null");

            const responce = await axios.get(`https://codeweb.onrender.com/api/v1/users/search?search=${search}&page=${page}&limit=${limit}`);

            if (!responce) throw new Error("responce is null");

            return responce.data;
        } catch (error) {
            console.log("authServices.searchUsers error: ", error);
            return null;
        }
    }
}

export const authServices = new AuthServices();
