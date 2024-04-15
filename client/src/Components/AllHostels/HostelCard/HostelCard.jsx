import "./HostelCard.css";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import KitchenIcon from '@mui/icons-material/Kitchen';
import LocalParkingIcon from '@mui/icons-material/LocalParking';

const HostelCard = () => {
  return (
    <>
     <Card sx={{ display: 'flex' }} className='cardMain'>
       <CardMedia
        id="hostelCardImg"
        component="img"
        sx={{ width: 151 }}
        image="/images/ROOM_RATES.jpeg"
      />
      <Box className="hostelDataCard" sx={{ display: 'flex', flexDirection: 'column' }}>
          <p className='hostelHeading'>
            Pak Boys hostel
          </p>
          <p className='hostelHeading'>
            Jinnah colony Faisalabad
          </p>
          <p className='hostelDescription'>
            <KitchenIcon /><LocalParkingIcon />
          </p>
          <p className='hostelPrice'><b>Price : 2000 RS/- </b></p>
      </Box>
      
    </Card>
    </>
  )
}

export default HostelCard