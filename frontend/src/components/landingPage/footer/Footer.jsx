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
                        <span>Địa chỉ: Ng. 9 D. Nguyên Hồng</span>
                        <span>Số điện thoại: 0953466443</span>
                        <span>Email: bkbkhotel@gmail.com </span>
                    </div>
                </div>
                <div className="media footer-item">
                    <span className="title">Mạng xã hội</span>
                    <div className="content">
                        <div
                            className="item"
                            onClick={() => window.open('https://www.facebook.com/imhotelph', '_blank')}
                        >
                            <span>Facebook</span>
                            <FaFacebook className="fa-icon" />
                        </div>
                        <div
                            className="item"
                            onClick={() =>
                                window.open('https://www.youtube.com/c/K%C3%AAnhHomestayVi%E1%BB%87tNam', '_blank')
                            }
                        >
                            <span>Youtube</span>
                            <FaYoutube className="you-icon" />
                        </div>
                        <div
                            className="item"
                            onClick={() => window.open('https://www.instagram.com/au_viet_hotel_hanoi', '_blank')}
                        >
                            <span>Instagram</span>
                            <FaInstagram className="ins-icon" />
                        </div>
                    </div>
                </div>
                <div className="map footer-item">
                    <span className="title">Bản đồ</span>
                    <FaMapMarkerAlt
                        className="map-icon"
                        onClick={() => window.open('https://maps.google.com/?q=Ng. 9 D. Nguyên Hồng', '_blank')}
                    />
                </div>
                <div className="copyright footer-item">
                    <span className="title">copyright</span>
                    <div className="content">
                        <span>© {new Date().getFullYear()} BKBK PREMIUM</span>
                        <span>All rights reserved</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
