import React from "react";
import Navbar from "../shared/navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setsearchCompanyByText } from "@/redux/companySlice";
const Companies = () =>{
   useGetAllCompanies();
   const [input,setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(setsearchCompanyByText(input));
        
    },[input]);
    return(
        <div>
            <Navbar/>
            <div className="  max-w-6xl mx-auto my-10">
                <div className="flex items-center justify-between">
                <Input
                      className="w-fit"
                      placeholder = "Filter by name"
                      onChange = {(e)=> setInput(e.target.value)}
                />
                <Button onClick ={()=>navigate("/admin/companies/create")} >New company</Button>

                </div>
                <CompaniesTable/>


            </div>
        </div>
    )
}
export default Companies