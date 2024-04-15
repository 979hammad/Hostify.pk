import "./RegisterNavBar.css";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { NavLink } from 'react-router-dom';

const RegisterNavBar = () => {
  return (
    <>
      <div className='RegistarNavBarMainDiv'>
        <p style={{color: "white"}}>Hostify.pk</p>
        <NavLink to="/" className='exitToHome'>
          Exit & Back to home
          <ExitToAppIcon />
        </NavLink>
      </div>
    </>
  )
}

export default RegisterNavBar