import { User } from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";



export const register = async(req,res)=>{
    try{
        const{fullname,email,phoneNumber,password,role}=req.body;
        if(!fullname|| !email|| !phoneNumber || !password|| !role){
            return res.status(400).json({
                message:"something is missing",
                success:false
            });
        }
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                message:"user already exist with this email",
                success:false,
                
            })
        }
        const hashedpassword = await bcrypt.hash(password,10);
        await User.create({
            fullname,
            email,
            phoneNumber,
            password:hashedpassword,
            role,
            profile:{
                profilePhoto :cloudResponse.secure_url,
            }
        });
        return res.status(201).json({
            message:"Account created successfully",
            success:true
        });

        

    } catch(error) {
        console.log(error);

    }
}
export const login = async (req, res) => {
    const { email, password, role } = req.body;
    try {
      if (!email || !password || !role) {
        return res.status(400).json({ message: "something is missing", success: false });
      }
  
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Incorrect email or password", success: false });
      }
  
      const ispasswordMatch = await bcrypt.compare(password, user.password);
      if (!ispasswordMatch) {
        return res.status(400).json({ message: "Incorrect email or password", success: false });
      }
  
      if (role != user.role) {
        return res.status(400).json({ message: "Account does not exist with current role", success: false });
      }
  
      const tokenData = { userId: user._id };
      const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" });
  
      user = {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile,
      };
  
      return res
        .status(200)
        .cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "strict" })
        .json({
          message: `Welcome back ${user.fullname}`,
          user,
          token,  // 🔑 send token in response
          success: true,
        });
    } catch (error) {
      console.log(error);
    }
  };
  export const logout = async (req, res) => {
    try {
      console.log("Logout request received"); // ✅ debug
      return res
        .status(200)
        .clearCookie("token", {
          httpOnly: true,
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
        })
        .json({
          message: "Logged out successfully",
          success: true,
        });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({ message: "Logout failed", success: false });
    }
  };
  
  
  
  

export const updateprofile = async(req,res)=>{
    try{
        const {fullname,email,phoneNumber,bio,skills} = req.body;
        console.log(fullname,email,phoneNumber,bio, skills);
        const file = req.file;
        console.log(file);
        
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        

            const skillsArray = skills.split(",");
         
        
            

   
        
        const userId = req.id;
        let user = await User.findById(userId);
        if(!user) {
            return res.status(400).json({
                message:"User not found",
                success:false
            })
        }
        if(fullname) user.fullname = fullname;
        if(phoneNumber) user.phoneNumber = phoneNumber;
        if(email) user.email = email;
        if(bio) user.profile.bio = bio;
        if(skills) user.profile.skills = skillsArray;
        if(cloudResponse){
            user.profile.resume= cloudResponse.secure_url
            user.profile.resumeOriginalName = file.originalname;
        }
        
        
      
        await  user.save();
        user ={
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }
        return res.status(200).json({
            message:"profile updated successfully",
            user,
            success:true

        })
    }catch(error){
        console.log(error);
    }
}