import Search from "../NavBar/Search/Search";
import NavBar from '../NavBar/NavBar/NavBar';
import Footer from "../Footer/Footer";
import HostelCard from "./HostelCard/HostelCard";
import SideFilters from "./SideFilters/SideFilters";
const AllHostels = () => {
  return (
    <>
    <div style={{backgroundColor : "#f8f9fa"}}>
     <NavBar/>
     <Search />
      <SideFilters />
      <HostelCard />
      <HostelCard />
      <HostelCard />
      <HostelCard />
    </div>
     <Footer />
    </>
  )
}

export default AllHostels