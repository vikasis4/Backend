import React from "react"
import HeroHomepageo from './HeroHomepageo';
import SecondSection from "./SecondSection";
import Thirdsection from './Thirdsection';
import whatsapp from './whatsapp.png'

const styleObj = {
    width: '10rem',
    height: '10rem',
    position: 'absolute',
    borderRadius: '50rem',
    backgroundColor: 'var(--s4)',
    // padding: '0.8rem',
    boxShadow: '0 0 12px 4px green',
    bottom: '20rem',
    zIndex: 101010,
    right: '1rem'
}

const HomePageO = () => {


    return (
        <>

            <>
                <HeroHomepageo />
                <SecondSection />
                <Thirdsection />
                {
                    screen.width < 480 ?
                        <a href="//api.whatsapp.com/send?phone=919034616480&text=Hello sir, I want to know about the rankboost Mentorship course">
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