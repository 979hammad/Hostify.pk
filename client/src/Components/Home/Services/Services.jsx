import ApartmentIcon from '@mui/icons-material/Apartment';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import "./Services.css";

const Services = () => {
  return (
    <>
      <div className="middleBody">
       <div className="innerDivSer">
            <ApartmentIcon id="servicesIco" />
            <p className="heading">Diverse Accommodations</p>
            <p className='servContent'>Curated Stays for Every Traveler</p>
       </div>

       <div className="innerDivSer">
            <WhereToVoteIcon id="servicesIco" />
            <p className="heading">Prime Locations</p>
            <p className='servContent'>Explore Vibrant Destinations with Us</p>
       </div>

       <div className="innerDivSer">
            <ThumbUpIcon  id="servicesIco" />
            <p className="heading">High-Quality Service</p>
            <p className='servContent'>Personalized Stays for Memorable Journeys</p>
       </div>


       <div className="innerDivSer">
            < VolunteerActivismIcon id="servicesIco" />
            <p className="heading">High-Quality Service</p>
            <p className='servContent'>Thumbs Up for Exceptional Service</p>
       </div>
      </div>
    </>
  )
}

export default Services