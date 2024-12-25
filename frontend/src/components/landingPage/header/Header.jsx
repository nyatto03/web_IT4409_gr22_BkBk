import './header.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
const Header = () => {
    return (
        <div className="header-container">
            <Swiper
                className="swiper"
                slidesPerView={1}
                spaceBetween={0}
                loop={true}
                autoplay={{ delay: 2000 }}
                modules={[Autoplay]}
                speed={1500}
            >
                <SwiperSlide>
                    <div className="header-slide slide1">
                        <div className="header-content">
                            <span className="content1">Khách sạn BKBK PREMIUM</span>
                            <span className="content2">Tận hưởng với phòng vip luxury</span>
                            <span className="content3">Gọi ngay</span>
                            <span className="content4">0987623455</span>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="header-slide slide2">
                        <div className="header-content">
                            <span className="content1">Khách sạn BKBK</span>
                            <span className="content2">Tận hưởng với phòng vip luxury</span>
                            <span className="content3">Gọi ngay</span>
                            <span className="content4">0987623455</span>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="header-slide slide3">
                        <div className="header-content">
                            <span className="content1">Khách sạn BKBK</span>
                            <span className="content2">Tận hưởng với phòng vip luxury</span>
                            <span className="content3">Gọi ngay</span>
                            <span className="content4">0987623455</span>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Header;
