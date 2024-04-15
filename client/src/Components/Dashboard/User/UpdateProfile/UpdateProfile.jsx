import React, { useEffect, useRef } from 'react'
import { useForm } from "react-hook-form";
import { format } from 'date-fns';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from "react-redux";
import { user, myProfile, updateProfile, profileUpdating } from '../../../../features/auth/userAuthSlice';
import "./UpdateProfile.css";

const UpdateProfile = () => {
    const dispatch = useDispatch();
    const userGot = useSelector((state) => user(state.user));
    const profileUpdating2 = useSelector((state) => profileUpdating(state.user));

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const datePickerRef = useRef(null);

    let dobFormatted = '';
    if (userGot && userGot.dob) {
        const dobDate = new Date(userGot.dob);
        if (!isNaN(dobDate.getTime())) { // Check if dobDate is a valid Date object
            dobFormatted = format(dobDate, 'MM-dd-yyyy');
        }
    }


    useEffect(() => {
        if (userGot) {
            setValue('fName', userGot?.fName);
            setValue('lName', userGot?.lName);
            setValue('gender', userGot?.gender);
            setValue('city', userGot?.city);
            setValue('province', userGot?.province);
            setValue('dob', dobFormatted);
        }
    }, [myProfile, userGot]);

    useEffect(() => {
        dispatch(myProfile())
    }, [])

    const submitForm = (data) => {
        dispatch(updateProfile(data));
    }

    return (
        <>
            <div className="updateProfileDiv">
                <div className='avatar'>
                    <div style={{ position: "relative", display: "inline" }}>
                        <Avatar alt="E" id="updateProfileIco" src={`${(userGot.userPic?.userImage) ? userGot.userPic.userImage?.path : "images/user-img.png"}`} />
                        <div className='cameraIconDiv'>
                            <CameraAltIcon id="updateProfileCameraIco"/>
                        </div>
                    </div>
                    <div >
                        <p className='userData userName'>{userGot.fName}&nbsp;{userGot.lName}</p>
                        <p className='userData'> {userGot.email}</p>
                        <p className='userData'> {dobFormatted}</p>
                        <p className='userData'> {userGot?.city} - {userGot?.province}</p>
                    </div>
                </div>

            </div>
            <div className='updateProfile2ndDiv'>
                <form onSubmit={handleSubmit(submitForm)}>
                    {/* <p className='userData'>Update your profile here </p> */}
                    <div id="updateProfileForm">

                        <div className='minHeight'>
                            <label htmlFor="fName" className='updateProfileL'>First Name</label>
                            <input
                                id='fName'
                                placeholder='Enter first name'
                                autoComplete='off'
                                {...register('fName')}
                            />
                        </div>
                        <div className='minHeight'>
                            <label htmlFor="lName" className='updateProfileL'>Last Name</label>
                            <input
                                id='lName'
                                placeholder='Enter last name'
                                autoComplete='off'
                                {...register('lName')}
                            />
                        </div>
                        <div className='minHeight'>
                            <label htmlFor="gender" className='updateProfileL'>Gender</label>
                            <select
                                id="gender"
                                defaultValue=""
                                {...register("gender")}

                            >
                                <option value="" disabled>Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className='minHeight'>
                            <label htmlFor="userCity" className='updateProfileL'>City</label>
                            <input
                                id='userCity'
                                placeholder='Enter city name'
                                autoComplete='off'
                                {...register('city')}
                            />
                        </div>
                        <div className='minHeight'>
                            <label htmlFor="province" className='updateProfileL'>Province</label>
                            <select
                                id="province"
                                defaultValue=""
                                {...register("province")}
                            >
                                <option value="" disabled>Select Province</option>
                                <option value="Punjab">Punjab</option>
                                <option value="Sindh">Sindh</option>
                                <option value="Balochistan">Balochistan</option>
                                <option value="KPK">KPK</option>
                            </select>
                        </div>
                        <div className='minHeight'>
                            <label htmlFor="dob" className='updateProfileL'>DOB</label>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    id="dob"
                                    ref={datePickerRef}
                                    onChange={(date) => setValue("dob", date)}
                                    sx={{
                                        '& .MuiInputBase-root': {
                                            height: "38px",
                                            width: "310px",
                                            backgroundColor: "rgb(240, 240, 240)",

                                        },
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            height: "40px",
                                            border: "none",
                                            borderRadius: "0px"
                                        }
                                    }}
                                />
                            </LocalizationProvider>
                        </div>
                    </div>
                    <div className='updateProfileBtnDiv'><button className='updateProfileBtn' type='submit'>{profileUpdating2 === "pending" ? "Updating ..." : "Update"}</button> </div>
                </form>
            </div>
        </>
    )
}

export default UpdateProfile;