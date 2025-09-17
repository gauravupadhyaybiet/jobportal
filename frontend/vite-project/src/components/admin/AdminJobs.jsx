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
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setsearchJobByText } from "@/redux/jobSlice";
const AdminJobs = () =>{
    useGetAllAdminJobs();
  
   const [input,setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(setsearchJobByText(input));
        
    },[input]);
    return(
        <div>
            <Navbar/>
            <div className="  max-w-6xl mx-auto my-10">
                <div className="flex items-center justify-between">
                <Input
                      className="w-fit"
                      placeholder = "Filter by name,role"
                      onChange = {(e)=> setInput(e.target.value)}
                />
                <Button onClick ={()=>navigate("/admin/jobs/create")} > New  Jobs</Button>

                </div>
                <AdminJobsTable/>


            </div>
        </div>
    )
}
export default AdminJobs