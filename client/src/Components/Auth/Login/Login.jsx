import {useState, Button, IconButton, Input, InputLabel, FormHelperText, InputAdornment,  Visibility, VisibilityOff, useForm, CloseIcon } from "../../../assets/MaterialUiExports.js";
import {DisplayLogin } from "../../../assets/DialogueAssets.js";
import {useDispatch, useSelector} from "react-redux";
import { loginUser, userLogin } from "../../../features/auth/userAuthSlice.js";
// import EmailRegister from "../SignUp/EmailRegister.jsx";
import "./Login.css";
import { useEffect } from "react";

const Login = ({openLogin, setOpen}) => {
  const dispatch = useDispatch();
  const {register, handleSubmit, formState: { errors }, reset} = useForm();
  const [showPassword, setShowPassword] = useState(false);
  // const [openSignUp, setOpenSignUp] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const userLogin2 = useSelector((state) => userLogin(state.user));
  
  const submitForm = (data) => {
    dispatch(loginUser(data))
  };

  useEffect(()=>{
    if(userLogin2 === "success")
     setOpen(false) 
     reset()
  },[userLogin2])

  const googleLogin = () => {
    window.open("http://localhost:8081/auth/google", "_self")
  }

  return (
    <>
    {/* <EmailRegister /> */}
    <DisplayLogin
    id="displayLogin"
    onClose={()=> setOpen(false)}
    open={openLogin}
  >
    <IconButton
      aria-label="close"
      onClick={() => setOpen(false)}
      sx={{
        position: "absolute",
        right: 8,
        top: 8,
        color: (theme) => theme.palette.grey[500],
      }}
    >
      <CloseIcon />
    </IconButton>
    <form className="signinForm" onSubmit={handleSubmit(submitForm)}>
      <div className="signInForm">
        <p className="signInHeading">Log in</p>
        <p className="signInHeading signInMsg">
          Welcome Back. Sign in to stay updated
        </p>
        <InputLabel htmlFor="email" id="email">Your Email</InputLabel>
        <Input
              id="signUpemail"
              autoComplete="off"
              {...register("email", {
                required: "Required field",
                pattern: {
                  value: /^[A-Z0-9.%+-]+@[A-Z0-9.]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              error={!!errors?.email}
            />
        <FormHelperText id="signInFormInputs">{errors?.email?.message}</FormHelperText>
        <InputLabel htmlFor="password"  id="password">Your Password</InputLabel>
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          {...register("password", { required: "Required field" })}
          error={!!errors?.password}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        <FormHelperText id="signInFormInputs">{errors?.password?.message}</FormHelperText>
        <Button id="loginBtn" type="submit" variant="contained">
          {userLogin2 === "pending" ? "Logging..." : "Log in"}
         
        </Button>
        <div className="line">
          <hr className="hrLine"/>
          <span >Or</span>
          <hr className="hrLine"/>
        </div>
        <div className="googleLogin" onClick={googleLogin}>
          <img className="googleLogo" src="images/google-logo.png" alt="" />
          <span className="googleLoginP">Sigin With Google</span>
        </div>
      </div>
      <p className="signUp">
        Dont have an account ? <a className="signUpClick"   
        // onClick={()=>{setOpen(false); setOpenSignUp(true)}}
       > SignUp</a>
      </p>
    </form>
    </DisplayLogin> 
    {/* <EmailRegister /> */}
    {/* <EmailRegister openSignUp={openSignUp} setOpenSignUp={setOpenSignUp}/> */}
    </>
  );
};

export default Login;
