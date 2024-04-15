import "./ChangePassword.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { changingPass, changePassword } from "../../../../features/auth/userAuthSlice";
import { useState } from "react";


const ChangePassword = () => {
  const dispatch = useDispatch();
  const changingPass2 = useSelector((state)=> changingPass(state.user));
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const submitForm = (data) => {
    dispatch(changePassword(data));
    reset();
  }
  
  return (
    <>
      <div className="changePasswordDiv">
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="changePassForm">
            <div className='minHeight'>
              <label htmlFor="currPassword" className='changePasswordL'>Current Password</label>
              <input
                id='currPassword'
                placeholder='Enter current password'
                autoComplete='off'
                type={(showPassword) ? "text" : "password" }
                {...register('oldPassword', { required: "This field is required" })}
              />
              <p className='errorChangePass'>{errors?.oldPassword?.message}</p>
            </div>
            <div className='minHeight'>
              <label htmlFor="newPassword" className='changePasswordL'>New Password</label>
              <input
                id='newPassword'
                placeholder='Enter new password'
                autoComplete='off'
                type={(showPassword) ? "text" : "password" }
                {...register('newPassword',  { required: "This field is required" })}
              />
              <p className='errorChangePass'>{errors?.newPassword?.message}</p>
            </div>
            <div className='minHeight'>
              <label htmlFor="cNewPassword" className='changePasswordL'>Confirm New Password</label>
              <input
                id='cNewPassword'
                placeholder='Re-enter new password'
                autoComplete='off'
                type={(showPassword) ? "text" : "password" }
                {...register('cNewPassword', { required: "This field is required" })}
              />
              <p className='errorChangePass'>{errors?.cNewPassword?.message}</p>
            </div>
          </div>
        <div className='updateProfileBtnDiv'><div className="changePasswordL showPassDiv"><label htmlFor="showPassword" style={{cursor: "pointer"}}>Show Password</label><input type="checkbox" onChange={()=>setShowPassword(!showPassword)} id="showPassword"/></div><button className='changePassBtn' type='submit'>{changingPass2 === "pending"? "Changing ...": "Change Password"}</button> </div>
        </form>
      </div>
    </>
  )
}

export default ChangePassword;