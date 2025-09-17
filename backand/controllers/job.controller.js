import { Job } from "../models/jobmodel.js";

export const  postjob  = async(req,res)=>{
    try{
        const {title,description,requirments,salary,location,jobType,experience,position,companyId}=req.body;
        const userId = req.id;
        if(!title||!description||!requirments||!salary||!location||!jobType ||!experience ||!position ||!companyId){
            return res.status(400).json({
                message:"something is missing",
                success:false
            })
        }
        const job = await Job.create({
            title,
            description,
            requirements:requirments.split(","),
            salary:Number(salary),
            location,
            jobType,
            experienceLevel:experience,
            position,
            company:companyId,
            created_by:userId
        });
        return res.status(201).json({
            message:"New created successfully",
            job,
            success:true
        });

    }catch(error){
        console.log(error);
    }
    
}
export const getAlljobs = async(req,res)=>{
    try{
        const keyword = req.query.keyword || "";
        const query = {
            $or:[
                {
                    title:{$regex:keyword, $options:"i"},

                },
                {
                    description:{$regex:keyword,$options:"i"}
                }

            ]
        };
        const jobs = await Job.find(query).populate({
            path:"company"
        }).sort({createdAt:-1});
        if(!jobs){
            return res.status(404).json({
                message:"jobs not found",
                success:false
            })
        };
        return res.status(200).json({
            jobs,
            success:true
        })
    } catch (error){
        console.log(error);
    }
}
export const getJobById = async(req,res)=>{
    try{
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });
        if(!job){
            return res.status(404).json({
                message:"jobs not found",
                success:false
            })
        };
        return res.status(200).json({job,success:true});




    }catch(error){
        console.log(error);
    }
}
// admin kitne job create kra hai abhi tak
export  const  getAdminjobs = async(req,res)=>{
    try{
        const adminId = req.id;
        const jobs = await Job.find({created_by:adminId}).populate({
            path:'company',
            createdAt:-1
        });
        if(!jobs){
            return res.status(404).json({
                message:"jobs not found",
                success:false
            })
        };
        return res.status(200).json({
            jobs,
            success:true
        })


    }catch(error){
        console.log(error);
    }
}
// Update Job
export const updateJob = async (req, res) => {
    try {
      const jobId = req.params.id;
      const updateData = { ...req.body };
  
      // if company is empty string, remove it
      if (!updateData.company) {
        delete updateData.company;
      }
  
      const updatedJob = await Job.findByIdAndUpdate(jobId, updateData, { new: true });
  
      if (!updatedJob) {
        return res.status(404).json({
          success: false,
          message: "Job not found",
        });
      }
  
      return res.status(200).json({
        success: true,
        message: "Job updated successfully",
        job: updatedJob,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  };
  
  