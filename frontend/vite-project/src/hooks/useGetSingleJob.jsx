import { setAllJobs, setSingleJob } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
const useGetSingleJob = (jobId) =>{
    const dispatch = useDispatch();

}
export default useGetSingleJob