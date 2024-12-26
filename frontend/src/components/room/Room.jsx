import './room.css';
import { useParams } from 'react-router-dom';
import { orderRoom, getRoom } from '../../apis/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { Tag, Modal, DatePicker, message } from 'antd';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import moment from 'moment';
const { RangePicker } = DatePicker;

const Room = () => {
    const [slideNumber, setSlideNumber] = useState(0);
    const [open, setOpen] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [dateRange, setDateRange] = useState([]);
    const [loading, setLoading] = useState(false);
    const { roomId } = useParams();
    const [room, setRoom] = useState(null);

    const handleOpen = (i) => {
        setSlideNumber(i);
        setOpen(true);
    };

    const handleMove = (direction) => {
        let newSlideNumber;

        if (direction === 'l') {
            newSlideNumber = slideNumber === 0 ? room?.images.length - 1 : slideNumber - 1;
        } else {
            newSlideNumber = slideNumber === room?.images.length - 1 ? 0 : slideNumber + 1;
        }

        setSlideNumber(newSlideNumber);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(price);
    };

    const getRoomTypeLabel = (type) => {
        const types = {
            single: 'Phòng đơn',
            double: 'Phòng đôi',
        };
        return types[type] || type;
    };

    const handleBookNow = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            message.error('Vui lòng đăng nhập để đặt phòng');
            return;
        }
        setIsModalVisible(true);
    };

    const handleBookingConfirm = async () => {
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

    const handleBookingCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const data = await getRoom(roomId);
                setRoom(data);
            } catch (error) {
                message.error('Không thể tải thông tin phòng');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchRoom();
    }, [roomId]);

    const handleAddressClick = () => {
        window.open('https://maps.google.com/?q=Ng. 9 D. Nguyên Hồng', '_blank');
    };

    return (
        <div>
            <div className="hotelContainer">
                {open && (
                    <div className="slider">
                        <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={() => setOpen(false)} />
                        <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={() => handleMove('l')} />
                        <div className="sliderWrapper">
                            <img src={`/assets/${room?.images[slideNumber]}`} alt="" className="sliderImg" />
                        </div>
                        <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={() => handleMove('r')} />
                    </div>
                )}
                <div className="hotelWrapper">
                    <button
                        className="bookNow"
                        onClick={handleBookNow}
                        disabled={room?.status.toLowerCase() !== 'available'}
                    >
                        {room?.status.toLowerCase() === 'available' ? 'Đặt ngay' : 'Đã được đặt'}
                    </button>
                    <Modal
                        title="Xác nhận đặt phòng"
                        open={isModalVisible}
                        onOk={() => handleBookingConfirm()}
                        onCancel={() => handleBookingCancel()}
                        confirmLoading={loading}
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
                    <h1 className="hotelTitle">{room?.name}</h1>
                    <div className="hotelAddress" onClick={handleAddressClick}>
                        <FontAwesomeIcon icon={faLocationDot} />
                        <span>Ng. 9 D. Nguyên Hồng</span>
                    </div>
                    <div className="roomTypeTags">
                        {room?.room_type.map((type, index) => (
                            <Tag key={index} color="blue">
                                {getRoomTypeLabel(type)}
                            </Tag>
                        ))}
                    </div>

                    <div className="hotelImages">
                        {room?.images.map((image, i) => (
                            <div className="hotelImgWrapper" key={i}>
                                <img
                                    onClick={() => handleOpen(i)}
                                    src={`/assets/${image}`}
                                    alt=""
                                    className="hotelImg"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="hotelDetails">
                        <div className="hotelDetailsTexts">
                            <h1 className="hotelTitle">Khách sạn ở trung tâm thành phố</h1>
                            <p className="hotelDesc">{room?.description}</p>
                        </div>
                        <div className="hotelDetailsPrice">
                            <h1>Giá phòng chỉ với</h1>
                            <h2>
                                <b>{formatPrice(room?.price)}/ngày</b>
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Room;
