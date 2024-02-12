import { useNavigate } from "react-router-dom"

export const useSafeNavigate = ()=>{
    const navigate = useNavigate();

    return (path,text)=>{
        const confirmation = confirm(text? text :"Are you sure you want to leave this page? Your changes may not be saved.");
        if (confirmation) {
            navigate(path);
        }
    }

}