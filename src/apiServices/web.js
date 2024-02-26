import axios from "axios";

export class WebService {

    async createWeb({title,description,html,css,js,isPublic=true,image}) {
        try {
            if (!title || !description || !image || !(html || css || js)) {
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

            const response = await axios.post("https://codeweb.onrender.com/api/v1/webs/create", formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return response.data;
        } catch (error) {
            console.log("webService.createWeb error: ", error);
            return {status:error.status,message:error.message,data:null};
        }
    }

    async createForkWeb({webId}){
        try {
            if (!webId) throw new Error("webId is null");

            const response = await axios.post(`https://codeweb.onrender.com/api/v1/webs/create-forked/${webId}`);

            return response.data;
        } catch (error) {
            console.log("webService.createForkWeb error: ", error);
            return {message:error.message,data:null,status:error.status};
        }
    }

    async getWebById({webId}) {
        try {
            if (!webId) throw new Error("webId is null");

            const response = await axios.get(`https://codeweb.onrender.com/api/v1/webs/get/${webId}`);

            return response.data;
        } catch (error) {
            console.log("webService.getWeb error: ", error);
            return {message:error.message,data:null,status:error.status};
        }
    }

    async getWebsByUsername({username,queryParameters="page=1&limit=4&webType=public"}) {
        try {
        // queryParameters = string contains all querys of url
        // valid querys are  webType , sortBy, sortOrder, page, limit;
        // sortBy = views, createdAt, likesCount, commentsCount
        // webType = public, private, forked
            if (!username) throw new Error("username is null");

            const response = await axios.get(`https://codeweb.onrender.com/api/v1/webs/user/${username}?${queryParameters}`)

            if (!response) throw new Error("Response is null");

            return response.data;
        } catch (error) {
            console.log("webService.getWebs error: ", error);
            return null;
        }
    }

    async getLikedWebsByUsername({username,queryParameters="page=1&limit=4"}) {
        try {
            // queryParameters = string contains all querys of url
            // valid querys are sortBy, sortOrder, page, limit;
            // sortBy = views, createdAt, likesCount, commentsCount
            if (!username) throw new Error("username is null");

            const response = await axios.get(`https://codeweb.onrender.com/api/v1/webs/liked/${username}?${queryParameters}`)

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
            const response = await axios.get(`https://codeweb.onrender.com/api/v1/webs/following?${queryParameters}`)

            if (!response) throw new Error("Response is null");

            return response.data;
        } catch (error) {
            console.log("webService.getFollowingUsersWebs error: ", error)
            return null;
        }
    }

    async getTrendingWebs({page=1,limit=4}){
        try {
            const response = await axios.get(`https://codeweb.onrender.com/api/v1/webs/trending?page=${page}&limit=${limit}`)

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
            const response = await axios.get(`https://codeweb.onrender.com/api/v1/webs/your-work?${queryParameters}`)

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

            const response = await axios.get(`https://codeweb.onrender.com/api/v1/webs/search/my-webs?search=${search.trim().replaceAll(" ","+")}&page=${page}&limit=${limit}`)

            if (!response) throw new Error("Response is null");

            return response.data;
        } catch (error) {
            console.log("webService.searchFromMyWebs error: ", error)
            return null;
        }
    }

    async showRecomendedPeople({page=1,limit=10}){
        try {
            const response = await axios.get(`https://codeweb.onrender.com/api/v1/webs/recomended-people?page=${page}&limit=${limit}`)

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
            if (!title && !description && html===undefined && css===undefined && js===undefined) throw new Error("No data to update");
            if (!title && !description && html==="" && css==="" && js==="") throw new Error("No data to update");
            const formData = new FormData();
            if(image) formData.append('image', image, 'my-image-name.jpeg');
            if(title) formData.append('title', title);
            if(description) formData.append('description', description);
            if(html !== undefined) formData.append('html', html);
            if(css !== undefined) formData.append('css', css);
            if(js !== undefined) formData.append('js', js);

          const response = await axios.patch(`https://codeweb.onrender.com/api/v1/webs/update/${webId}`,formData,{
              headers: {
                'Content-Type': 'multipart/form-data',
              },
          })

            return response.data;
        } catch (error) {
            console.log("webService.updateWeb error: ", error)
            return {status:error.status,message:error.message,data:null};
        }
    }

    async deleteWeb({webId}){
        try {
            if (!webId) throw new Error("webId is null");

            const response = await axios.delete(`https://codeweb.onrender.com/api/v1/webs/delete/${webId}`)

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

            const response = await axios.patch(`https://codeweb.onrender.com/api/v1/webs/toggle-publish-status/${webId}`)

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

            const response = await axios.patch(`https://codeweb.onrender.com/api/v1/webs/inc-view/${webId}`)

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

            const response = await axios.get(`https://codeweb.onrender.com/api/v1/webs/search/all-webs?search=${search.trim().replaceAll(" ","+")}&page=${page}&limit=${limit}`)

            if (!response) throw new Error("Response is null");

            return response.data;
        } catch (error) {
            console.log("webService.searchFromAllWebs error: ", error)
            return null;
        }
    
    }

    async getEditorPreferences(){
        try {
            const response = await axios.get(`https://codeweb.onrender.com/api/v1/webs/editor-preferences`)

            if (response.data.status>=400) return {
                message:response.data.message,
                status:response.data.status,
                data:{
                    theme:"vs-dark",
                    indentation:2,
                    fontSize:"15px",
                    fontWeight:"500",
                    formatOnType:true,
                    minimap:false,
                    lineHeight:20,
                    mouseWheelZoom:true,
                    wordWrap:"on"
                }
            };

            return response.data;
        } catch (error) {
            console.log("webService.getEditorPreferences error: ", error)
            return {
                message:error.message,
                status:error.status,
                data:{
                    theme:"vs-dark",
                    indentation:2,
                    fontSize:"15px",
                    fontWeight:"500",
                    formatOnType:true,
                    minimap:false,
                    lineHeight:20,
                    mouseWheelZoom:true,
                    wordWrap:"on"
                }
            };
        }
    
    }

    async updateEditorPreferences({theme,fontSize,fontWeight,formatOnType,lineHeight,mouseWheelZoom,wordWrap}){
        try {
            const response = await axios.patch(`https://codeweb.onrender.com/api/v1/webs/update-editor-preferences`,{
                theme:theme||"vs-dark",
                fontSize:fontSize||"15px",
                fontWeight:fontWeight||"500",
                formatOnType:formatOnType||true,
                lineHeight:lineHeight||20,
                mouseWheelZoom:mouseWheelZoom||true,
                wordWrap:wordWrap||"on"
            })

            return response.data;
        } catch (error) {
            console.log("webService.updateEditorPreferences error: ", error)
            return {status:error.status,message:error.message,data:null};
        }
    
    }


    async chengeEditorView({indentation}){
        try {
            if(!indentation) throw new Error("indentation is null");
            const response = await axios.patch(`https://codeweb.onrender.com/api/v1/webs/chenge-editor-view`,{
                indentation:indentation
            })

            return response.data;
        } catch (error) {
            console.log("webService.updateEditorPreferences error: ", error)
            return {status:error.status,message:error.message,data:null};
        }
    
    }

}

export const webService = new WebService();