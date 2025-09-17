import React from "react";
import Navbar from "./shared/navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {  Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import { useState } from "react";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const skills = ["HTML","CSS","JAVASCRIPT"];
const isResume = true;
const Profile =() =>{
    useGetAppliedJobs();
    
    const [open,setOpen] = useState(false);
    const {user} = useSelector(store=>store.auth);

    return(
        <div>
            <Navbar/>
            <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
                <div className="flex justify-between">
                <div className="flex items-center gap-4">
                <Avatar className="h-24 w-24">
                    
                    <AvatarImage src="data:image/jpeg;base64,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" alt=""></AvatarImage>


                </Avatar>
                <div>
                <h1 className="font-medium  text-xl">{user?.fullname}</h1>
                <p>{user?.profile?.bio} </p>

                </div>


                

                </div>
                <Button onClick ={()=> setOpen(true)}className="text-right" variant="outline"><Pen/></Button>

                </div>
                <div className="my-5">
                    <div className="flex items-center gap-3 my-2">
                        <Mail/>
                        <span>{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-3 my-2">
                        <Contact/>
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className="my-5">
                    <h1>skills</h1>
                    <div className="flex items-center gap-1">
                    {
                       user?.profile?.skills.length !=0 ? user?.profile?.skills.map((item,index)=><Badge key={index}>{item}</Badge>):<span>NA</span>
                    }

                    </div>
 
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                       <Label className="text-md front-bold">Resume</Label>
                       {
                        isResume? <a target="blank" href={user?.profile?.resume} className="text-blue-500 w-full hover:underline cursor:pointer">{user?.profile?.resumeOriginalName}</a>:<span>NA</span>
                       }

                </div>

 

            </div>
            <div className="max-w-4xl mx-auto bg-white rounded-2xl">
                    <h1 className="font-bold text-lg my-5">Applied jobs</h1>
                    <AppliedJobTable/>
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}
export default Profile
