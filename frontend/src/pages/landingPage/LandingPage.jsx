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
            <section id="home">
                <Header />
            </section>
            <section id="about">
                <About />
            </section>
            <section id="famous-room">
                <FamousRoom />
            </section>
            <section id="amenities">
                <Amen />
            </section>
            <section id="comment">
                <Comment />
            </section>

            <Footer />
        </div>
    );
};

export default LandingPage;
