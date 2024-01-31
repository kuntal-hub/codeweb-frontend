import axios from "axios";

export class AuthServices {

    async createUser ({username,email,password,fullName,verificationURL=""}) {
        try {
            if (!username || !email || !password || !fullName) throw new Error("username or email or password or fullName is null");

            const responce = await axios.post("/api/v1/users/register", {
                username,
                email,
                password,
                fullName,
                verificationURL
            });

            if (!responce) throw new Error("responce is null");
            
            return await this.login({identifier:email,password});

        } catch (error) {
            console.log("authServices.createUser error: ", error);
            return null;
        }
    }

    async login ({identifier,password}) {
        try {
            if (!identifier || !password) throw new Error("identifier or password is null");

            const responce = await axios.post("/api/v1/users/login", {
                identifier,
                password
            });

            if (!responce) throw new Error("responce is null");

            return responce.data.user;
        } catch (error) {
            console.log("authServices.login error: ", error);
            return null;
        }
    }

    async logout ({fromAllDevices=false}) {
        try {
            const responce = await axios.post(`/api/v1/users/logout?fromAllDevices=${fromAllDevices}`);

            if (!responce) throw new Error("responce is null");

            return true;
        } catch (error) {
            console.log("authServices.logout error: ", error);
            return false;
        }
    }

    async refreshAccessToken () {
        try {
            const responce = await axios.post("/api/v1/users/refresh-token");

            if (!responce) throw new Error("responce is null");

            return true;
        } catch (error) {
            console.log("authServices.refreshAccessToken error: ", error);
            return false;
        }
    }

    async getCurrentUser () {
        try {
            const responce = await axios.get("/api/v1/users/me");

            if (!responce) throw new Error("responce is null");

            return responce.data;
        } catch (error) {
            console.log("authServices.getCurrentUser error: ", error);
            return null;
        }
    
    }

    async requestVeryficationEmail ({verificationURL=""}) {
        try {
            const responce = await axios.post("/api/v1/users/request-verify-email", {
                verificationURL
            });

            if (!responce) throw new Error("responce is null");

            return true;
        } catch (error) {
            console.log("authServices.requestVeryficationEmail error: ", error);
            return false;
        }
    
    }

    async verifyEmail ({token}) {
        try {
            if (!token) throw new Error("token is null");

            const responce = await axios.post("/api/v1/users/verify-email", {
                token
            });

            if (!responce) throw new Error("responce is null");

            return true;
        } catch (error) {
            console.log("authServices.verifyEmail error: ", error);
            return false;
        }
    
    }

    async requestForgotPasswordEmail ({email,resetPasswordURL=""}) {
        try {
            if (!email) throw new Error("email is null");

            const responce = await axios.post("/api/v1/users/request-forgot-password-email", {
                email,
                resetPasswordURL
            });

            if (!responce) throw new Error("responce is null");

            return true;
        } catch (error) {
            console.log("authServices.requestForgotPasswordEmail error: ", error);
            return false;
        }
    
    }

    async resetPasswrod ({token,newPassword}) {
        try {
            if (!token || !newPassword) throw new Error("token or newPassword is null");

            const responce = await axios.post("/api/v1/users/reset-password", {
                token,
                newPassword
            });

            if (!responce) throw new Error("responce is null");

            return true;
        } catch (error) {
            console.log("authServices.resetPassrod error: ", error);
            return false;
        }
    
    }

    async updateUser(data) {
        // data = {fullName,bio,link1,link2,link3}
        try {
            if (!data) throw new Error("data is null");

            const responce = await axios.patch("/api/v1/users/update",{...data});

            if (!responce) throw new Error("responce is null");

            return responce.data;
        } catch (error) {
            console.log("authServices.updateUser error: ", error);
            return null;
        }
    }

    async chengePassword({oldPassword,newPassword}){
        try {
            if (!oldPassword || !newPassword) throw new Error("oldPassword or newPassword is null");

            const responce = await axios.post("/api/v1/users/change-password",{oldPassword,newPassword});

            if (!responce) throw new Error("responce is null");

            return true;
        } catch (error) {
            console.log("authServices.chengePassword error: ", error);
            return false;
        }
    }

    async chengeEmail({email,password,verificationURL=""}){
        try {
            if(!email || !password) throw new Error("email or password is null");

            const responce = await axios.post("/api/v1/users/change-email",{email,password,verificationURL});

            if (!responce) throw new Error("responce is null");

            return responce.data;
        } catch (error) {
            console.log("authServices.chengeEmail error: ", error);
            return null;
        }
    }

    async deleteUser({password}){
        try {
            if (!password) throw new Error("password is null");

            const responce = await axios.delete("/api/v1/users/delete",{password});

            if (!responce) throw new Error("responce is null");

            return true;
        } catch (error) {
            console.log("authServices.deleteUser error: ", error);
            return false;
        }
    }

    async updateAvatar({image,public_id}){
        try {
            if(!image || !public_id) throw new Error("image or public_id is null");

            const responce = await axios.patch("/api/v1/users/update-avatar",{image,public_id});

            if (!responce) throw new Error("responce is null");

            return responce.data;
        } catch (error) {
            console.log("authServices.updateAvatar error: ", error);
            return null;
        }
    }

    async updateCoverImage({image,public_id}){
        try {
            if(!image || !public_id) throw new Error("image or public_id is null");

            const responce = await axios.patch("/api/v1/users/update-cover-image",{image,public_id});

            if (!responce) throw new Error("responce is null");

            return responce.data;
        } catch (error) {
            console.log("authServices.updateCoverImage error: ", error);
            return null;
        }
    }

    async getUserProfile({username}){
        try {
            if(!username) throw new Error("username is null");

            const responce = await axios.get(`/api/v1/users/profile/${username}`);

            if (!responce) throw new Error("responce is null");

            return responce.data;
        } catch (error) {
            console.log("authServices.getUserProfile error: ", error);
            return null;
        }
    }

    async getPinedItems({page=1,limit=4}){
        try {
            const responce = await axios.get(`/api/v1/users/pined?page=${page}&limit=${limit}`);

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

            const responce = await axios.patch(`/api/v1/users/add-to-pined/${webId}`);

            if (!responce) throw new Error("responce is null");

            return true;
        } catch (error) {
            console.log("authServices.addToPinedItems error: ", error);
            return false;
        }
    
    }

    async removePinedItem({webId}){
        try {
            if(!webId) throw new Error("webId is null");

            const responce = await axios.patch(`/api/v1/users/remove-pined/${webId}`);

            if (!responce) throw new Error("responce is null");

            return true;
        } catch (error) {
            console.log("authServices.removePinedItem error: ", error);
            return false;
        }
    }

    async updateShowcase({showcase}){
        try {
            if(!showcase) throw new Error("showcase is null");

            const responce = await axios.patch("/api/v1/users/update-showcase",{showcase});

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

            const responce = await axios.get(`/api/v1/users/check-username-availability/${username}`);

            if (!responce) throw new Error("responce is null");

            return true;
        } catch (error) {
            console.log("authServices.checkUsernameAvailablity error: ", error);
            return false;
        }
    }
}

export const authServices = new AuthServices();
