import Search from "../NavBar/Search/Search";
import NavBar from '../NavBar/NavBar/NavBar';
import Footer from "../Footer/Footer";
import HostelCard from "./HostelCard/HostelCard";
import SideFilters from "./SideFilters/SideFilters";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allHostelsData, allHostels, specificHostelDetail } from "../../features/hostel/registerHostelSlice";
import { NavLink } from "react-router-dom";
const AllHostels = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(allHostels());
  },[])

  const allHostelsRegistered = useSelector((state) => allHostelsData(state.hostel));
  
  // const fetchHostelDetail = (id) =>{
  //   dispatch(specificHostelDetail(id))
  // }

  return (
    <>
    <div style={{backgroundColor : "#f8f9fa"}}>
     <NavBar/>
     <Search />
      <SideFilters />
      {
        allHostelsRegistered.map((hostel)=> {
          return (
            <NavLink style={{textDecoration : "none"}} to={`/hosteldetail/${hostel._id}`} key={hostel._id}><HostelCard  hostelData = {hostel}/></NavLink>
          )
        })
      }
    </div>
     <Footer />
    </>
  )
}

export default AllHostels