import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import FeaturedHostels from '../FeaturedHostels';
import "./Swipper.css";

// Import Swiper styles
import 'swiper/css';
import 'swiper/less/navigation';

const Swipper = () => {
  return (
    <>
    <div className='swipperPadding'>
    <h3 >Our featured hostels are here</h3>
    <hr /> 
    <Swiper
       id='swipper'
       modules={[Navigation]}
       spaceBetween={80}
       slidesPerView={4}
       navigation
       pagination={{ clickable: true }}
       scrollbar={{ draggable: true }}   
    >
      <SwiperSlide><FeaturedHostels /></SwiperSlide>
      <SwiperSlide><FeaturedHostels /></SwiperSlide>
      <SwiperSlide><FeaturedHostels /></SwiperSlide>
      <SwiperSlide><FeaturedHostels /></SwiperSlide>
      <SwiperSlide><FeaturedHostels /></SwiperSlide>
      <SwiperSlide><FeaturedHostels /></SwiperSlide>
      <SwiperSlide><FeaturedHostels /></SwiperSlide>
      <SwiperSlide><FeaturedHostels /></SwiperSlide>
      <SwiperSlide><FeaturedHostels /></SwiperSlide>
      <SwiperSlide><FeaturedHostels /></SwiperSlide>
      <SwiperSlide><FeaturedHostels /></SwiperSlide>
      <SwiperSlide><FeaturedHostels /></SwiperSlide>
      <SwiperSlide><FeaturedHostels /></SwiperSlide>
      <SwiperSlide><FeaturedHostels /></SwiperSlide>
      <SwiperSlide><FeaturedHostels /></SwiperSlide>
      <SwiperSlide><FeaturedHostels /></SwiperSlide>
    </Swiper>
    </div>
    </>
  )
}

export default Swipper;