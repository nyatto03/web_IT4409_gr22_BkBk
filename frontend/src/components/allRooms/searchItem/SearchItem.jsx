import './searchItem.css';
import { useNavigate } from 'react-router-dom';
import { orderRoom } from '../../../apis';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Tag, Modal, DatePicker, message } from 'antd';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useState } from 'react';
import moment from 'moment';
const { RangePicker } = DatePicker;

const SearchItem = ({ room }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [dateRange, setDateRange] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleRoomClick = () => {
        navigate(`/room/${room._id}`);
    };
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(price);
    };

    const getStatusColor = (status) => {
        return status.toLowerCase() === 'available' ? 'success' : 'error';
    };
    const getRoomTypeLabel = (type) => {
        const types = {
            single: 'Phòng đơn',
            double: 'Phòng đôi',
        };
        return types[type] || type;
    };

    const handleBook = (event) => {
        event.stopPropagation();
        const token = localStorage.getItem('token');
        if (!token) {
            message.error('Vui lòng đăng nhập để đặt phòng');
            return;
        }
        setIsModalVisible(true);
    };

    const handleBookingConfirm = async (event) => {
        event.stopPropagation();
        if (!dateRange[0] || !dateRange[1]) {
            message.error('Vui lòng chọn ngày nhận và trả phòng');
            return;
        }

        setLoading(true);
        try {
            const userData = JSON.parse(localStorage.getItem('user'));
            const user_id = userData._id;
            await orderRoom(
                user_id,
                room._id,
                'pending',
                room.price,
                dateRange[0].format('YYYY-MM-DD'),
                dateRange[1].format('YYYY-MM-DD'),
            );
            message.success('Đặt phòng thành công!');
            setIsModalVisible(false);
            window.location.reload();
        } catch (error) {
            message.error('Đặt phòng thất bại: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleBookingCancel = (event) => {
        event.stopPropagation();
        setIsModalVisible(false);
    };

    //hello
    const fixedImages = ['101-2.jpg', '101-5.jpg', '102-4.jpg', '102-5.jpg', '103-1.jpg', '103-4.jpg'];
    const displayImages = room.images && room.images.length > 0 ? room.images : fixedImages;

    return (
        <div className="searchItem" onClick={handleRoomClick}>
            <div className="siImgContainer">
                <Swiper
                    navigation={{
                        prevEl: '.swiper-button-prev',
                        nextEl: '.swiper-button-next',
                    }}
                    pagination={{ clickable: true }}
                    modules={[Navigation, Pagination]}
                    className="siSwiper"
                >
                    {displayImages.map((image, index) => (
                        <SwiperSlide key={index}>
                            <img src={`/assets/${image}`} alt={`${room.name} - Ảnh ${index + 1}`} className="siImg" />
                        </SwiperSlide>
                    ))}
                    <div className="swiper-button-prev" onClick={(e) => e.stopPropagation()} />
                    <div className="swiper-button-next" onClick={(e) => e.stopPropagation()} />
                </Swiper>
            </div>

            <div className="siContent">
                <div className="siDesc">
                    <h1 className="siTitle">{room.name}</h1>
                    <div className="siTags">
                        <Tag color={getStatusColor(room.status)}>
                            {room.status.toLowerCase() === 'available' ? 'Còn trống' : 'Đã được đặt'}
                        </Tag>
                        {room.room_type.map((type, index) => (
                            <Tag key={index} color="blue">
                                {getRoomTypeLabel(type)}
                            </Tag>
                        ))}
                    </div>
                    <p className="siDescription">{room.description}</p>
                </div>

                <div className="siDetails">
                    <div className="siPrice">{formatPrice(room.price)}/ngày</div>
                    <div className="siTaxOp">Đã bao gồm thuế và phí</div>
                    <button
                        className="siCheckButton"
                        disabled={room.status.toLowerCase() !== 'available'}
                        onClick={(e) => handleBook(e)}
                    >
                        {room.status.toLowerCase() === 'available' ? 'Đặt ngay' : 'Đã được đặt'}
                    </button>
                    <Modal
                        title="Xác nhận đặt phòng"
                        open={isModalVisible}
                        onOk={(e) => handleBookingConfirm(e)}
                        onCancel={(e) => handleBookingCancel(e)}
                        confirmLoading={loading}
                        mask={true}
                        maskClosable={true}
                        modalRender={(modal) => <div onClick={(e) => e.stopPropagation()}>{modal}</div>}
                    >
                        <div className="booking-form" onClick={(e) => e.stopPropagation()}>
                            <p>Chọn ngày nhận phòng và trả phòng:</p>
                            <RangePicker
                                style={{ width: '100%' }}
                                onChange={(dates) => setDateRange(dates)}
                                format="DD-MM-YYYY"
                                disabledDate={(current) => current && current < moment().startOf('day')}
                            />
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default SearchItem;
