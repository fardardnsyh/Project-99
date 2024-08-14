import React from "react";
import Main from '../assets/images/main-alternative.svg'
import { Logo } from '../components/index'
import Wrapper from '../assets/wrappers/LandingPage'
import { Link } from 'react-router-dom'

const Landing = () => {
    return (
        <Wrapper>
            <nav>
                <Logo />
            </nav>
            <div className="container page">
                <div className="info">
                    <h1>
                        job <span>tracking</span> app
                    </h1>
                    <p>
                        Track your jobs with our website from anywhere in the world and automatically update when new jobs appear.

                        Know your company with up to date information from a rich data and a rich web interface.

                        Never get bored with many of the applications and tools installed
                    </p>
                    <Link to='/register' className="btn btn-hero">login/Register</Link>
                </div>
                <img src={Main} alt="job hunt" className="img main-img" />
            </div>
        </Wrapper>
    );
};

export default Landing;
