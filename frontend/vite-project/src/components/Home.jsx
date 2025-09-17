import React from 'react'
import Navbar from './shared/navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Home = () =>{
    useGetAllJobs();
    const {user} = useSelector(store=>store.auth);
    const navigate = useNavigate();
    useEffect(()=>{
        if(user?.role === "recuiter"){
            navigate("/admin/companies");
        }

    },[]);

    return(
        <div>
            <Navbar/>
            <HeroSection/>
            <CategoryCarousel/>
            <LatestJobs/>
            <Footer/>

        </div>

    )
}
export default Home