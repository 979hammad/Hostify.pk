import "./HostelCard.css";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

const HostelCard = ({hostelData}) => {
  
  const lowestCharge = hostelData.rooms.reduce((minCharge, curr) => Math.min(minCharge, curr.charges), Infinity);
  return (
    <>
     <Card sx={{ display: 'flex' }} className='cardMain'>
       <CardMedia
        id="hostelCardImg"
        component="img"
        sx={{ width: 151 }}
        image={hostelData.hostelImages[0]?.path}
      />
      <Box className="hostelDataCard" sx={{ display: 'flex', flexDirection: 'column' }}>
          <p className='hostelHeading'>
            {hostelData.title}
          </p>
          <p className='hostelAddress'>
            {hostelData.completeAdress}-{hostelData.city}
          </p>
          <p className='hostelDescription'>
            {hostelData.category === "male" ? (<>Boys<MaleIcon/></>): (<>Girls<FemaleIcon /> </>)}
          </p>
          <p className='hostelPrice'><b>Starting From : {lowestCharge} RS/- </b></p>
      </Box>
      
    </Card>
    </>
  )
}

export default HostelCard