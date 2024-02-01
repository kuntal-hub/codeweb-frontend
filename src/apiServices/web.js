import axios from "axios";

export class WebService {

    async createWeb({title,description,html,css,js,isPublic=true,image}) {
        try {
            if (!title || !description || image || !(html || css || js)) {
                throw new Error("title, description, image and at least one of html, css or js are required");
            }

            const formData = new FormData();
            formData.append('image', image, 'my-image-name.jpeg');
            formData.append('title', title);
            formData.append('description', description);
            formData.append('html', html || "");
            formData.append('css', css || "");
            formData.append('js', js || "");
            formData.append('isPublic', isPublic);

            const response = await axios.post("/api/v1/webs/create", formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (!response) throw new Error("Response is null");

            return response.data;
        } catch (error) {
            console.log("webService.createWeb error: ", error);
            return null;
        }
    }

    async createForkWeb({webId}){
        try {
            if (!webId) throw new Error("webId is null");

            const response = await axios.post(`/api/v1/webs/create-forked/${webId}`);

            if (!response) throw new Error("Response is null");

            return response.data;
        } catch (error) {
            console.log("webService.createForkWeb error: ", error);
            return null;
        }
    }

    async getWebById({webId}) {
        try {
            if (!webId) throw new Error("webId is null");

            const response = await axios.get(`/api/v1/webs/${webId}`);

            if (!response) throw new Error("Response is null");

            return response.data;
        } catch (error) {
            console.log("webService.getWeb error: ", error);
            return null;
        }
    }

    async getWebsByUserID({userId,queryParameters="page=1&limit=4&webType=public"}) {
        try {
        // queryParameters = string contains all querys of url
        // valid querys are  webType , sortBy, sortOrder, page, limit;
        // sortBy = views, createdAt, likesCount, commentsCount
        // webType = public, private, forked
            if (!userId) throw new Error("userId is null");

            const response = await axios.get(`/api/v1/webs/user/${userId}?${queryParameters}`)

            if (!response) throw new Error("Response is null");

            return response.data;
        } catch (error) {
            console.log("webService.getWebs error: ", error);
            return null;
        }
    }

    async getLikedWebsByUserID({userId,queryParameters="page=1&limit=4"}) {
        try {
            // queryParameters = string contains all querys of url
            // valid querys are sortBy, sortOrder, page, limit;
            // sortBy = views, createdAt, likesCount, commentsCount
            if (!userId) throw new Error("userId is null");

            const response = await axios.get(`/api/v1/webs/liked/${userId}?${queryParameters}`)

            if (!response) throw new Error("Response is null");

            return response.data;
        } catch (error) {
            console.log("webService.getLikedWebsByUserID error: ", error);
            return null;
        }
    }

    async getFollowingUsersWebs({queryParameters="page=1&limit=4"}){
        try {
            // queryParameters = string contains all querys of url
            // valid querys are sortBy, sortOrder, page, limit;
            // sortBy = views, createdAt, likesCount, commentsCount
            const response = await axios.get(`/api/v1/webs/following?${queryParameters}`)

            if (!response) throw new Error("Response is null");

            return response.data;
        } catch (error) {
            console.log("webService.getFollowingUsersWebs error: ", error)
            return null;
        }
    }

    async getTrendingWebs({page=1,limit=4}){
        try {
            const response = await axios.get(`/api/v1/webs/trending?page=${page}&limit=${limit}`)

            if (!response) throw new Error("Response is null");

            return response.data;
        } catch (error) {
            console.log("webService.getTrendingWebs error: ", error)
            return null;
        }
    }

    async getYourWorkWebs({queryParameters="page=1&limit=4"}){
        try {
            // queryParameters = string contains all querys of url
            // valid querys are sortBy, sortOrder, page, limit;
            const response = await axios.get(`/api/v1/webs/your-work?${queryParameters}`)

            if (!response) throw new Error("Response is null");

            return response.data;
        } catch (error) {
            console.log("webService.getYourWorkWebs error: ", error)
            return null;
        }
    }

    async searchFromMyWebs({page=1,limit=4,search}){
        try {
            if (!search) throw new Error("search is null");

            const response = await axios.get(`/api/v1/webs/search/my-webs?search=${search.trim().replaceAll(" ","+")}&page=${page}&limit=${limit}`)

            if (!response) throw new Error("Response is null");

            return response.data;
        } catch (error) {
            console.log("webService.searchFromMyWebs error: ", error)
            return null;
        }
    }

    async showRecomendedPeople({page=1,limit=10}){
        try {
            const response = await axios.get(`/api/v1/webs/recomended-people?page=${page}&limit=${limit}`)

            if (!response) throw new Error("Response is null");

            return response.data;
        } catch (error) {
            console.log("webService.showRecomendedPeople error: ", error)
            return null;
        }
    }

    async updateWeb({webId,title,description,html,css,js,image}){
        try {
            if (!webId) throw new Error("webId is null");
            if (!title && !description && !html && !css && !js) throw new Error("No data to update");
            if (!image) throw new Error("image is null");
            const formData = new FormData();
            formData.append('image', image, 'my-image-name.jpeg');
            if(title) formData.append('title', title);
            if(description) formData.append('description', description);
            if(html) formData.append('html', html);
            if(css) formData.append('css', css);
            if(js) formData.append('js', js);

          const response = await axios.patch(`/api/v1/webs/update/${webId}`,formData,{
              headers: {
                'Content-Type': 'multipart/form-data',
              },
          })

            if (!response) throw new Error("Response is null");

            return response.data;
        } catch (error) {
            console.log("webService.updateWeb error: ", error)
            return null;
        }
    }

    async deleteWeb({webId}){
        try {
            if (!webId) throw new Error("webId is null");

            const response = await axios.delete(`/api/v1/webs/delete/${webId}`)

            if (!response) throw new Error("Response is null");

            return true;
        } catch (error) {
            console.log("webService.deleteWeb error: ", error)
            return false;
        }
    }

    async togglePublishStatusOfWeb({webId}){
        try {
            if (!webId) throw new Error("webId is null");

            const response = await axios.patch(`/api/v1/webs/toggle-publish-status/${webId}`)

            if (!response) throw new Error("Response is null");

            return true;
        } catch (error) {
            console.log("webService.togglePublishStatusOfWeb error: ", error)
            return false;
        }
    
    }

    async increaseViewsOfWeb({webId}){
        try {
            if (!webId) throw new Error("webId is null");

            const response = await axios.patch(`/api/v1/webs/inc-view/${webId}`)

            if (!response) throw new Error("Response is null");

            return true;
        } catch (error) {
            console.log("webService.increaseViewsOfWeb error: ", error)
            return false;
        }
    
    }


    async searchFromAllWebs({page=1,limit=4,search}){
        try {
            if (!search) throw new Error("search is null");

            const response = await axios.get(`/api/v1/webs/search/all-webs?search=${search.trim().replaceAll(" ","+")}&page=${page}&limit=${limit}`)

            if (!response) throw new Error("Response is null");

            return response.data;
        } catch (error) {
            console.log("webService.searchFromAllWebs error: ", error)
            return null;
        }
    
    }

}

export const webService = new WebService();