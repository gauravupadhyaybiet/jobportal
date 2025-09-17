import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import Navbar from "../shared/navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experienceLevel: "",
    position: "",
    company: ""
  });

  // Fetch job details
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${id}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          const job = res.data.job;

          setInput({
            title: job.title || "",
            description: job.description || "",
            requirements: job.requirements ? job.requirements.join(", ") : "",
            salary: job.salary || "",
            location: job.location || "",
            jobType: job.jobType || "",
            experienceLevel: job.experienceLevel || "",
            position: job.position || "",
            company: job.company?._id || ""
          });
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch job");
      }
    };
    fetchJob();
  }, [id]);

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
  
      // build payload
      const payload = {
        ...input,
        requirements: input.requirements.split(",").map((r) => r.trim())
      };
  
      // 👇 if company is empty, remove it from payload
      if (!payload.company) {
        delete payload.company;
      }
  
      const res = await axios.put(`${JOB_API_END_POINT}/update/${id}`, payload, {
        withCredentials: true,
      });
  
      if (res.data.success) {
        toast.success("Job updated successfully!");
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <h1 className="text-2xl font-bold mb-6 text-center">✏️ Edit Job</h1>

        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input name="title" value={input.title} onChange={changeHandler} />
          </div>
          <div>
            <Label>Description</Label>
            <Input
              name="description"
              value={input.description}
              onChange={changeHandler}
            />
          </div>
          <div>
            <Label>Requirements (comma separated)</Label>
            <Input
              name="requirements"
              value={input.requirements}
              onChange={changeHandler}
            />
          </div>
          <div>
            <Label>Salary</Label>
            <Input name="salary" value={input.salary} onChange={changeHandler} />
          </div>
          <div>
            <Label>Location</Label>
            <Input
              name="location"
              value={input.location}
              onChange={changeHandler}
            />
          </div>
          <div>
            <Label>Job Type</Label>
            <Input
              name="jobType"
              value={input.jobType}
              onChange={changeHandler}
            />
          </div>
          <div>
            <Label>Experience Level</Label>
            <Input
              name="experienceLevel"
              value={input.experienceLevel}
              onChange={changeHandler}
            />
          </div>
          <div>
            <Label>Position</Label>
            <Input
              name="position"
              value={input.position}
              onChange={changeHandler}
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Updating..." : "Update Job"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditJob;


