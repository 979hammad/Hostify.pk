import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import "./ReviewSwippers.css";

// Import Swiper styles
import 'swiper/css';
import 'swiper/less/navigation';

const ReviewSwippers = ({reviews}) => {
    return (
        <>
            <Swiper
                id='swipper'
                modules={[Navigation]}
                spaceBetween={80}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
            >
                {
                    reviews && reviews.map((review)=> {
                        return (
                            <SwiperSlide key={review._id}>
                            <div className="reviewsDiv">
                                <Avatar id="reviewAvatar" sx={{ bgcolor: "purple" }}>{review.user.email[0]}</Avatar>
                                {review.user.fName} {review.user.lName}
                                <Rating name="read-only" value={review.rating} readOnly />
                                <p>{review.comment}</p>
                            </div>
                        </SwiperSlide>
                    )})
                }
                
                
            </Swiper>
        </>
    )
}

export default ReviewSwippers