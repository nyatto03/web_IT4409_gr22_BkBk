import './comment.css';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import img1 from '../../../assets/testi-1.jpg';
import img2 from '../../../assets/testi-2.jpg';
import img3 from '../../../assets/testi-3.jpg';

const Comment = () => {
    return (
        <div className="comment-swapper">
            <div className="comment-container">
                <p className="title">Nhận xét của khách hàng</p>
                <Swiper
                    className="swiper"
                    slidesPerView={1}
                    spaceBetween={30}
                    loop={true}
                    autoplay={{ delay: 1600 }}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        1200: {
                            slidesPerView: 2,
                        },
                    }}
                    modules={[Autoplay]}
                    speed={1500}
                >
                    <SwiperSlide>
                        <div className="comment">
                            <img src={img1} alt="" />
                            <div className="comment-content">
                                <h3>Anh Hoàng Đạo</h3>
                                <span>Khách hàng của khách sạn</span>
                                <p>
                                    Khách sạn thực sự mang lại trải nghiệm đẳng cấp. Phòng nghỉ rộng rãi, sạch sẽ, và
                                    được thiết kế hiện đại nhưng vẫn giữ được sự ấm cúng. Nhân viên phục vụ rất chuyên
                                    nghiệp, nhiệt tình và luôn sẵn sàng hỗ trợ khách hàng.
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="comment">
                            <img src={img2} alt="" />
                            <div className="comment-content">
                                <h3>Anh Phúc Lịnh</h3>
                                <span>Khách hàng của khách sạn</span>
                                <p>
                                    Khách sạn thực sự mang lại trải nghiệm đẳng cấp. Phòng nghỉ rộng rãi, sạch sẽ, và
                                    được thiết kế hiện đại nhưng vẫn giữ được sự ấm cúng. Nhân viên phục vụ rất chuyên
                                    nghiệp, nhiệt tình và luôn sẵn sàng hỗ trợ khách hàng.
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="comment">
                            <img src={img3} alt="" />
                            <div className="comment-content">
                                <h3>Chị Thu Hà</h3>
                                <span>Khách hàng của khách sạn</span>
                                <p>
                                    Khách sạn thực sự mang lại trải nghiệm đẳng cấp. Phòng nghỉ rộng rãi, sạch sẽ, và
                                    được thiết kế hiện đại nhưng vẫn giữ được sự ấm cúng. Nhân viên phục vụ rất chuyên
                                    nghiệp, nhiệt tình và luôn sẵn sàng hỗ trợ khách hàng.
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};

export default Comment;
