import './amen.css';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import img1 from '../../../assets/pool.jpg';
import img2 from '../../../assets/gym.jpg';
import img3 from '../../../assets/rest.jpg';
import { useNavigate } from 'react-router-dom';

const Amen = () => {
    const navigate = useNavigate();
    return (
        <div className="amen-container">
            <p className="title">Tiện nghi</p>
            <Swiper
                className="swiper"
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                autoplay={{ delay: 2000 }}
                modules={[Autoplay]}
                speed={2000}
            >
                <SwiperSlide>
                    <div className="amen-item">
                        <img src={img1} alt="" />
                        <div className="amen-content">
                            <h2>Bể bơi</h2>
                            <p>Trải nghiệm các tiện nghi tuyệt vời nhất tại đây</p>
                            <button onClick={() => navigate('/login')}>Đặt phòng ngay</button>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="amen-item">
                        <img src={img2} alt="" />
                        <div className="amen-content">
                            <h2>Phòng gym</h2>
                            <p>Trải nghiệm các tiện nghi tuyệt vời nhất tại đây</p>
                            <button onClick={() => navigate('/login')}>Đặt phòng ngay</button>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="amen-item">
                        <img src={img3} alt="" />
                        <div className="amen-content">
                            <h2>Nhà hàng</h2>
                            <p>Trải nghiệm các tiện nghi tuyệt vời nhất tại đây</p>
                            <button onClick={() => navigate('/login')}>Đặt phòng ngay</button>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Amen;
