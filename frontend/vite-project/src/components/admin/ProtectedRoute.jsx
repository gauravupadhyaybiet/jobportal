import store from "@/redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const ProtectRoute = ({children})=>{
    const {user} = useSelector(store=>store.auth);
    const navigate = useNavigate();
    useEffect(()=>{
        if(user===null || user.role != 'recuiter'){
            navigate("/");
        }

    },[]);
    return(
        <>
          {children}
        </>

    )
    
};
export default ProtectRoute