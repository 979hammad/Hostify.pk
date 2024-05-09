import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import "./HostelDetail.css";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HostelDetailImage from './HostelDetailImage/HostelDetailImage';
import HostelDetailFAndR from './HostelDetailF&R/HostelDetailF&R';
import RoomTable from './RoomTable/RoomTable';
import AddReview from './AddReview/AddReview';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReviewSwippers from './ReviewSwippers/ReviewSwippers';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { hostelDetail, specificHReviews, specificHostelDetail } from '../../../features/hostel/registerHostelSlice';
import AboutOwner from './AboutOwner/AboutOwner';

const HostelDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const hostelData = useSelector((state) => hostelDetail(state.hostel));
    const reviews = useSelector((state) => specificHReviews(state.hostel));

    useEffect(() => {
        dispatch(specificHostelDetail(id))
    }, [])

    return (
        <>
            {hostelData && (
                <>
                    <div className='hostelDetailNav'>
                        <NavLink to='/allhostels' className="backToAllHostelsBtn"><ArrowBackIcon id="backToAllHostelsIco" />Back</NavLink>
                    </div>
                    <div className='hostelDetailMainDiv'>
                        <h1 className='hostelDetailHostelName'>{hostelData.title} ({hostelData.category})</h1>
                        <HostelDetailImage hostelImages={hostelData.hostelImages} />
                        <p><LocationOnIcon /> {hostelData.completeAdress} - {hostelData.city} - {hostelData.province}</p>
                        <hr />
                        <AboutOwner hostelOwner={hostelData.owner}/>
                        <div className="hostelDetailDesc">
                            <h1>Description</h1>
                            <p>{hostelData.description}</p>
                        </div>
                        <HostelDetailFAndR facilities={hostelData.facilities} rules={hostelData.rules}/>
                        <RoomTable roomType={hostelData.rooms} />
                        <div>
                            <h1>You will be here</h1>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d13617.506712029477!2d73.07594429999999!3d31.43129545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1715080651901!5m2!1sen!2s" height="450" style={{ "border": 0, "width": "83.5vw" }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                        <AddReview hostelId={hostelData._id} />
                    </div>
                    <div className='showReviews'>
                        <div className='userReviews'>
                            <ReviewSwippers reviews={reviews} />
                        </div>
                    </div>
                </>)}
        </>
    )
}

export default HostelDetail