import './about.css';

const About = () => {
    return (
        <div className="about-container">
            <p className="title">Về chúng tôi</p>
            <div className="about-wrapper">
                <div className="about-img">
                    <img src="/assets/about-one.png" alt="" />
                </div>
                <div className="about-content">
                    <span className="content1">Khách sạn BKBK PREMIUM</span>
                    <span className="content2">
                        Chúng tôi mang đến <span className="hightlight">sự thanh lịch</span>
                    </span>
                    <p className="about-slogan">
                        Kết hợp hoàn hảo giữa vẻ đẹp sang trọng, dịch vụ đẳng cấp và không gian yên bình,
                        <br /> mang đến cho bạn một kỳ nghỉ hoàn hảo hơn cả mong đợi
                    </p>
                    <div className="about-cards">
                        <div className="about-card">
                            <p className="content3">50+ </p>
                            <span className="content4">khách</span>
                        </div>
                        <div className="about-card the-second-card">
                            <p className="content3">10+</p>
                            <span className="content4">phòng</span>
                        </div>
                        <div className="about-card">
                            <p className="content3">10+</p>
                            <span className="content4">khu vui chơi</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
