import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import "./FeaturedHostels.css"
import { CardActionArea } from '@mui/material';
import Rating from '@mui/material/Rating';
import KitchenIcon from '@mui/icons-material/Kitchen';
import LocalParkingIcon from '@mui/icons-material/LocalParking';

const FeaturedHostels = ()  => {
  return (
   <>
    <Card id="card">
      <CardActionArea>
        <CardMedia
          component="img"
          height="170"
          image="/images/main-hostel.jpeg"
        />
        <CardContent>
          <Typography id="hostelName" gutterBottom >
            Punjab Boys Hosel
          </Typography>
          <Typography >
            <KitchenIcon id="fHIco"/> <LocalParkingIcon id="fHIco"/>
          </Typography>
          <Typography gutterBottom id="hostelRatings" >
          <span>2000 Rs/head</span>   <Rating name="read-only" value={2} readOnly  size="small"/> 
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
   </>
  )
}
export default FeaturedHostels

{/* <div className="hostelList">
      <figure className="hover">
      <img className="hostelImg" src='/images/main-hostel.jpeg'/>
      <figcaption className="caption">Royal Hostel<br/>2500 Rs
      <NavLink to="/hosteldetail" className="enquireButton">Enquire</NavLink>
      </figcaption>
      </figure>
    </div> */}