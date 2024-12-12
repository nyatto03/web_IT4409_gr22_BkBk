import Navbar from '../../components/landingPage/navbar/Navbar';
import Header from '../../components/landingPage/header/Header';
import About from '../../components/landingPage/about/About';
import FamousRoom from '../../components/landingPage/famousRoom/FamousRoom';
import Amen from '../../components/landingPage/amenities/Amen';
import Comment from '../../components/landingPage/comments/Comment';
import Footer from '../../components/landingPage/footer/Footer';

const LandingPage = () => {
    return (
        <div className="landing-page">
            <Navbar />
            <Header />
            <About />
            <FamousRoom />
            <Amen />
            <Comment />
            <Footer />
        </div>
    );
};

export default LandingPage;
