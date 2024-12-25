import './orderItem.css';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Tag } from 'antd';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import moment from 'moment';

const OrderItem = ({ room, checkinDate, checkoutDate, orderStatus }) => {
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

    const getOrderStatusLabel = (orStatus) => {
        switch (orStatus.toLowerCase()) {
            case 'pending':
                return 'Đang xử lí';
            case 'canceled':
                return 'Đã bị hủy';
            default:
                return 'Đặt phòng thành công';
        }
    };

    const getOrderStatusColor = (orStatus) => {
        switch (orStatus.toLowerCase()) {
            case 'pending':
                return '#faad14'; // Gold
            case 'canceled':
                return '#ff4d4f'; // Red
            default:
                return '#52c41a'; // Green
        }
    };

    return (
        <div className="orderItem" onClick={() => handleRoomClick()}>
            <div className="oiImgContainer">
                <Swiper
                    navigation={{
                        prevEl: '.swiper-button-prev',
                        nextEl: '.swiper-button-next',
                    }}
                    pagination={{ clickable: true }}
                    modules={[Navigation, Pagination]}
                    className="oiSwiper"
                >
                    {room.images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <img src={`/assets/${image}`} alt={`${room.name} - Ảnh ${index + 1}`} className="oiImg" />
                        </SwiperSlide>
                    ))}
                    <div className="swiper-button-prev" onClick={(e) => e.stopPropagation()} />
                    <div className="swiper-button-next" onClick={(e) => e.stopPropagation()} />
                </Swiper>
            </div>

            <div className="oiContent">
                <div className="oiDesc">
                    <h1 className="oiTitle">{room.name}</h1>
                    <div className="oiTags">
                        <Tag color={getStatusColor(room.status)}>
                            {room.status.toLowerCase() === 'available' ? 'Còn trống' : 'Đã được đặt'}
                        </Tag>
                        {room.room_type.map((type, index) => (
                            <Tag key={index} color="blue">
                                {getRoomTypeLabel(type)}
                            </Tag>
                        ))}
                    </div>
                    <div className="oiDates">
                        <p>Ngày nhận phòng: {moment(checkinDate).format('DD/MM/YYYY')}</p>
                        <p>Ngày trả phòng: {moment(checkoutDate).format('DD/MM/YYYY')}</p>
                    </div>
                    <p className="oiDescription">{room.description}</p>
                </div>

                <div className="oiDetails">
                    <div className="oiPrice">{formatPrice(room.price)}/ngày</div>
                    <div className="oiTaxOp">Đã bao gồm thuế và phí</div>
                    <div className="oiStatus" style={{ color: getOrderStatusColor(orderStatus) }}>
                        {getOrderStatusLabel(orderStatus)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderItem;
