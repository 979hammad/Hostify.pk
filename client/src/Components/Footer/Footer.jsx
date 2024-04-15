
import { Icon } from '@iconify/react';
import snapchatIcon from '@iconify/icons-mdi/snapchat';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Input, FormHelperText, useForm, Button} from "../../assets/MaterialUiExports.js";
import "./Footer.css"

const Footer = () => {
  const {register, handleSubmit, formState: { errors }} = useForm();

  const submitForm = (data) => {
    console.log(data)
  };

  return (
    <div className='footer'>
        <div className='lFooter'>
         {/* <img id='footerLogo' src='/wafflaroLogo.png' /> */}
         <span id='footerLogo'>Hostify.pk</span>
         
         <div className='fRegisterEmail'>
         <span className='fSpanS'>Get The Latest News & Updates</span>
         <form onSubmit={handleSubmit(submitForm)}>
         <Input
              id="footerEmail"
              autoComplete="off"
              placeholder='Enter your name ...'
              {...register("email", {
                required: "Required field",
              })}
              error={!!errors?.email}
            />
            <FormHelperText id="signUpFormInputs">
              {errors?.email?.message}
            </FormHelperText> 
         <Input
              id="footerEmail"
              autoComplete="off"
              placeholder='Enter your email to get updates ...'
              {...register("email", {
                required: "Required field",
                pattern: {
                  value: /^[A-Z0-9.%+-]+@[A-Z0-9.]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              error={!!errors?.email}
            />
            <FormHelperText id="signUpFormInputs">
              {errors?.email?.message}
            </FormHelperText>
            <Button id='footerBtn'>Submit</Button>
            </form>
         </div>
        </div>
        <div className='rFooter'>
           <div className='rFooter-sec1'>
           <span className='fSpanContact'>Contact Us!</span>
           <span className='fSpan' ><PhoneIcon id="footerIco"/>+92 3067011663</span>
           <span className='fSpan' ><WhatsAppIcon id="footerIco"/>+92 3017378441</span>
           <span className='fSpan'><MailOutlineIcon id="footerIco"/>979hammadakram@gmail.com</span>
           <span className='fSpan'><LocationOnIcon id="footerIco"/>Jinnah colony FSD</span>
           <span className='fSpanContact'>Social Media Links</span>
         <div className='lFooter-sec'>
           <InstagramIcon id="lFooterIco" />
           <FacebookIcon id="lFooterIco" />
           <Icon id="lFooterIco" icon={snapchatIcon} />
           <YouTubeIcon id="lFooterIcoY" />
         </div>
           </div>
           <div className='rFooter-sec1'>
           <span className='fSpanContact'>Important Links</span>
           <span className='fSpan'><KeyboardArrowRightIcon />Home Page</span>
           <span className='fSpan'><KeyboardArrowRightIcon />Display All Hostels</span>
           <span className='fSpan'><KeyboardArrowRightIcon />Display All Online Mess Providers</span>
           <span className='fSpan'><KeyboardArrowRightIcon />Create a Post</span>
           <span className='fSpan'><KeyboardArrowRightIcon />About Us</span>
           <span className='fSpan'><KeyboardArrowRightIcon />SignIn</span>
           <span className='fSpan'><KeyboardArrowRightIcon />Create Account</span>
           </div>
           <div className='rFooter-sec1'>
           <span className='fSpanContact'>Register Your Bussiness</span>
           <span className='fSpan'><KeyboardArrowRightIcon />Register your hostel</span>
           <span className='fSpan'><KeyboardArrowRightIcon />Register your Online Mess</span>
           <span className='fSpan'><KeyboardArrowRightIcon />Register your home for students</span>
           <span className='fSpan'><KeyboardArrowRightIcon />Create a Post for your bussiness</span>
           </div>
        </div>
    </div>
  )
}

export default Footer