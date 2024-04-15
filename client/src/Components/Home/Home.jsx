import NavBar from '../NavBar/NavBar/NavBar';
import HeaderPic from './HeaderPic/HeaderPic';
import CitiesCard from './CitiesCard/CitiesCard';
import Services from "./Services/Services";
import Swipper from './FeaturedHostels/Swipper/Swipper';
import Footer from '../Footer/Footer';
import "./Home.css";

const Home = () => {
 
  return (
    <>
    <NavBar />
    <HeaderPic />
    <Swipper />
    <Services />
    <CitiesCard />
    <Footer />
    </>
  )
}

export default Home