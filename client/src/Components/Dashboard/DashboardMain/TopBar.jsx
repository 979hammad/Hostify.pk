import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { NavLink } from "react-router-dom";
import "./DashboardMain.css";

const TopBar = ({name}) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const currentDate = new Date();

    const day = currentDate.getDate();
    const month = months[currentDate.getMonth()];
    const year = currentDate.getFullYear();
    
    const getDaySuffix = (day) => {
      switch (day) {
          case 1:
              return "st";
          case 2:
              return "nd";
          case 3:
              return "rd";
          default:
              return "th";
      }
    };

    const formattedDate = `${day}${getDaySuffix(day)}, ${month} ${year}`;

   return (
    <>
      <div className="topBarMain">
        <span className='topHeadingProfile'>{name}</span>
        {formattedDate}
        <NavLink to='/' className="backToHomeBtn"><ArrowBackIcon id="backToHomeIco"/>Home</NavLink>
      </div>
    </>
   )
}

export default TopBar;