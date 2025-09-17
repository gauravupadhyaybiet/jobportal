import React from "react";
import Navbar from "../shared/navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useState } from "react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
const CompanyCreate = () =>{
    const navigate = useNavigate();
    const [companyName,setCompanyName] = useState();
    const dispatch = useDispatch();
    const registerNewCompany = async ()=>{


        try{
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`,{companyName},{withCredentials:true},{
                 headers:{
                    'Content-Type':'application/json'
                 },
                 
                 
            });
            if(res?.data?.success){
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id
                navigate(`/admin/companies/${companyId}/edit`);
            }

        }catch(error){
            console.log(error)

        }
    }

    return(
        <div>
            <Navbar/>
            <div className="max-w-4xl mx-auto">
                <div className="my-18">
                 <h1 className="font-bold text-2xl">Your Company Name</h1>
                 <p className="text-gray-500">Lorem ipsum dolor, sit </p>

                </div>

                <Label>Company Name</Label>
                <Input
                  type = "text"
                  className="my-2"
                  placeholder = "jobHunt ,Microsoft etc."
                  onChange = {(e)=> setCompanyName(e.target.value)}
                />
                <div className="flex items-center gap-2 my-18 ">
                    <Button variant="outline" onClick = {()=>navigate("/admin/companies")}>Cancel</Button>
                    <Button onClick ={registerNewCompany}>Continue</Button>

                </div>
                  

            </div>
        </div>
    )
}
export default CompanyCreate