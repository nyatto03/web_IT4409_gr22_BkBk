import './footer.css';
import { FaFacebook } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-container">
                <div className="infor footer-item">
                    <span className="title">Thông tin liên hệ</span>
                    <div className="content">
                        <span>Địa chỉ: số 1 Đại Cồ việt</span>
                        <span>Số điện thoại: 0953466443</span>
                        <span>Email: bkbkhotel@gmail.com </span>
                    </div>
                </div>
                <div className="media footer-item">
                    <span className="title">Mạng xã hội</span>
                    <div className="content">
                        <div className="item">
                            <span>Facebook</span>
                            <FaFacebook className="fa-icon" />
                        </div>
                        <div className="item">
                            <span>Youtube</span>
                            <FaYoutube className="you-icon" />
                        </div>
                        <div className="item">
                            <span>Instagram</span>
                            <FaInstagram className="ins-icon" />
                        </div>
                    </div>
                </div>
                <div className="map footer-item">
                    <span className="title">Bản đồ</span>
                    <FaMapMarkerAlt className="map-icon" />
                </div>
                <div className="copyright footer-item">
                    <span className="title">copyright</span>
                </div>
            </div>
        </div>
    );
};

export default Footer;
