import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import Navbar from './components/shared/navbar'
import Home from './components/Home'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectRoute from './components/admin/ProtectedRoute'
import EditJob from './components/admin/EditJob'

const appRouter = createBrowserRouter([
   {
    path:'/',
    element:<Home/>
   },
   {
    path:'/login',
    element:<Login/>
   },
   {
    path:'/signup',
    element:<Signup/>
   },
   {
    path:"/jobs",
    element:<Jobs/>
   },
   {
    path:"/description/:id",
    element:<JobDescription/>
   },
   {
    path:"/browse",
    element:<Browse/>
   },
   {
    path:"/profile",
    element:<Profile/>
   },
   // admin ke liye yha se start hoga
   {
    path:"/admin/companies",
    element:  <ProtectRoute><Companies/></ProtectRoute>
   },
   {
    path:"/admin/companies/create",
    element:<ProtectRoute><CompanyCreate/> </ProtectRoute>
   },
   {
    path:"/admin/companies/:id/edit",
    element: <ProtectRoute><CompanySetup/></ProtectRoute>
   },
   {
    
      path:"/admin/jobs",
      element: <ProtectRoute><AdminJobs/></ProtectRoute>
     
   },
   {
    path:"/admin/jobs/create",
    element: <ProtectRoute><PostJob/></ProtectRoute>
   },
   {
    path:"/admin/jobs/:id/applicants",
    element:<ProtectRoute><Applicants/> </ProtectRoute>
   },
   {
    path:"/admin/jobs/:id/edit",
    element: <ProtectRoute><EditJob/></ProtectRoute>
  }
  



])
function App() {
 

  return (
    <>
    <RouterProvider router = {appRouter}/>
       
       
       
    </>
  )
}

export default App
