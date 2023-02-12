import React from "react"
import HeroHomepageo from './HeroHomepageo';
import SecondSection from "./SecondSection";
import Thirdsection from './Thirdsection';
import whatsapp from './whatsapp.png'
import winner from '../explore/winner.png'
import cross from '../../svg/cross.svg'
import { useNavigate } from "react-router-dom";

const styleObj = {
    width: '10rem',
    height: '10rem',
    position: 'absolute',
    borderRadius: '50rem',
    backgroundColor: 'green',
    boxShadow: '0 0 12px 4px green',
    bottom: '20rem',
    zIndex: 101010,
    right: '1rem'
}

const HomePageO = (props) => {

    const referLink = props.id;
    const navigate = useNavigate()
    const [show, setShow] = React.useState(false);

    React.useEffect(() => {
        if (localStorage.getItem('selections')) {
            //
        } else {
            setShow(true)
            localStorage.setItem('selections', 'nothing-special')
        }
    }, [])

    return (
        <>

            <>
                <HeroHomepageo referLink={referLink} />
                <SecondSection />
                <Thirdsection />
                {
                    show === true ?
                        <>
                            <div className="show">
                                <div className="show-cont">
                                    <div onClick={() => setShow(false)} className="show-cross">
                                        <img src={cross} style={{height:'6rem', width:'6rem', marginRight:'10rem'}} />
                                    </div>
                                    <img src={winner} ></img>
                                    <h1>Achievements of our students</h1>
                                    <h2><span>1200+ Mains</span>  <span>400+ Advance</span></h2>
                                    <button onClick={() => navigate('/selections')}>View Selections</button>
                                </div>
                            </div>
                        </>
                        :
                        ''
                }
                {
                    screen.width < 480 ?
                        <a href="//api.whatsapp.com/send?phone=918572087710&text=Hello sir, I want to know about the rankboost Mentorship course">
                            <img src={whatsapp} style={styleObj} />
                        </a>
                        :
                        ''
                }
            </>
        </>
    )
}

export default HomePageO;